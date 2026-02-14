<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Stripe\Webhook;

class SubscriptionController extends Controller
{
    public function createSubscription(Request $request)
    {
        $request->validate([
            'plan' => 'required|in:monthly,yearly',
        ]);

        $user = $request->user();

        Stripe::setApiKey(env('STRIPE_SECRET'));

        $priceId = $request->plan === 'monthly'
            ? env('STRIPE_PRICE_MONTHLY')
            : env('STRIPE_PRICE_YEARLY');

        $session = Session::create([
            'mode' => 'subscription',
            'customer_email' => $user->email,
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price' => $priceId,
                'quantity' => 1,
            ]],
            'metadata' => [
                'user_id' => $user->id,
                'type' => 'blue_tick',
                'plan' => $request->plan,
            ],
            'success_url' => env('FRONTEND_URL') . '/success?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => env('FRONTEND_URL') . '/cancel',
        ]);

        return response()->json([
            'url' => $session->url
        ]);
    }

    public function handleWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $secret = env('STRIPE_WEBHOOK_SECRET');

        try {
            $event = Webhook::constructEvent($payload, $sigHeader, $secret);
        } catch (\Throwable $e) {
            Log::error('Invalid Stripe Webhook: ' . $e->getMessage());
            return response('Invalid webhook', 400);
        }

        Log::info("Stripe Webhook Received", [
            'type' => $event->type
        ]);

        if ($event->type === 'checkout.session.completed') {

            $session = $event->data->object;

            $userId = $session->metadata->user_id ?? null;
            $plan   = $session->metadata->plan ?? null;

            if (!$userId || !$plan) {
                Log::error("Missing metadata in checkout.session.completed", [
                    'session_id' => $session->id
                ]);
                return response('Missing metadata', 200);
            }

            $user = User::find($userId);

            if (!$user) {
                Log::error("User not found", [
                    'user_id' => $userId
                ]);
                return response('User not found', 200);
            }

            if (DB::table('transactions')->where('stripe_id', $session->id)->exists()) {
                return response('Already processed', 200);
            }

            // expiry
            $expiry = $plan === 'monthly'
                ? now()->addMonth()
                : now()->addYear();

            $user->update([
                'has_blue_tick' => true,
                'blue_tick_expires_at' => $expiry,
            ]);

            DB::table('transactions')->insert([
                'user_id' => $user->id,
                'stripe_id' => $session->id,
                'amount' => ($session->amount_total ?? 0) / 100,
                'currency' => strtoupper($session->currency ?? 'usd'),
                'purpose' => 'blue_tick',
                'status' => 'paid',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }


        if ($event->type === 'invoice.payment_failed') {

            $invoice = $event->data->object;

            if (DB::table('transactions')->where('stripe_id', $invoice->id)->exists()) {
                return response('Already processed', 200);
            }

            $userId = $invoice->metadata->user_id ?? null;

            DB::table('transactions')->insert([
                'user_id' => $userId,
                'stripe_id' => $invoice->id,
                'amount' => ($invoice->amount_due ?? 0) / 100,
                'currency' => strtoupper($invoice->currency ?? 'usd'),
                'purpose' => 'blue_tick',
                'status' => 'failed',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        return response('OK', 200);
    }
}
