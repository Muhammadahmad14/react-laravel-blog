<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\User;
use Stripe\Stripe;

class DashboardController extends Controller
{
    public function __invoke()
    {
        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

        $payments = \Stripe\PaymentIntent::all();

        $totalAmount = 0;

        foreach ($payments->data as $payment) {
            if ($payment->status === 'succeeded') {
                $totalAmount += $payment->amount/100;
            }
        }
        $trendPosts = Post::withCount(['comments', 'likes'])
            ->orderByDesc('comments_count')
            ->orderByDesc('likes_count')
            ->toke(5)
            ->get();

        return response()->json([
            'trendPosts' => $trendPosts,
            'total_users' => User::count(),
            'verified_users' => User::where('has_blue_tick', true)->count(),
            'total_balance' => $totalAmount
        ]);
    }
}
