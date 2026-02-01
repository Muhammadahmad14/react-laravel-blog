<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Stripe\Webhook;
use Illuminate\Support\Facades\DB;


class SubscriptionController extends Controller
{
    public function createSubscription(Request $request)
    {
        $request->validate([
            'plan' => 'required|in:monthly,yearly',
        ]);

        $user = $request->user();
        Stripe::setApiKey(env('STRIPE_SECRET'));

        // Select price based on plan
        $priceId = $request->plan === 'monthly'
            ? env('STRIPE_PRICE_MONTHLY')
            : env('STRIPE_PRICE_YEARLY');

        $session = Session::create([
            'mode' => 'subscription',
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
            'success_url' => env('FRONTEND_URL') . '/success',
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
            return response('Invalid webhook', 400);
        }

        if ($event->type !== 'checkout.session.completed') {
            return response('Ignored', 200);
        }

        $session = $event->data->object;

        if ($session->payment_status !== 'paid') {
            return response('Not paid', 200);
        }

        $userId = $session->metadata->user_id ?? null;
        if (!$userId) return response('No user', 200);

        $user = User::find($userId);
        if (!$user) return response('User not found', 200);

        // Prevent duplicate
        if (DB::table('transactions')->where('stripe_id', $session->id)->exists()) {
            return response('Already processed', 200);
        }

        // Calculate expiry
        $expiry = now();
        if ($session->metadata->plan === 'monthly') {
            $expiry->addMonth();
        } elseif ($session->metadata->plan === 'yearly') {
            $expiry->addYear();
        }

        // Update user
        $user->update([
            'has_blue_tick' => true,
            'blue_tick_expires_at' => $expiry,
        ]);

        // Save transaction
        DB::table('transactions')->insert([
            'user_id' => $user->id,
            'stripe_id' => $session->id,
            'subscription_id' => $session->subscription,
            'amount' => $session->amount_total ? $session->amount_total / 100 : null,
            'currency' => strtoupper($session->currency ?? 'usd'),
            'purpose' => $session->metadata->type,
            'status' => 'paid',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response('OK', 200);
    }
}
