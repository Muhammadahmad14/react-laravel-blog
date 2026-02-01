<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index()
    {
        return view('stripe.index');
    }

    public function store(Request $request)
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET_KEY'));

        $charge = $stripe->charges->create([
            'amount' => $request->price * 100,
            'currency' => 'usd',
            'source' => $request->stripe_token,
             'description' => "payment from blog app"
        ]);

        dd($charge);
    }
}
