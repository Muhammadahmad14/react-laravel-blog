<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Stripe\Stripe;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));
        $balance = $stripe->balance->retrieve();
        $totalAmount = $balance->available[0]->amount / 100;

        $trendPosts = Post::withCount(['comments', 'likes'])
            ->orderByDesc('comments_count')
            ->orderByDesc('likes_count')
            ->take(5)
            ->get();

        $year = now()->year;
        $currentMonth = now()->month;
        $posts = Post::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as total')
        )
            ->whereYear('created_at', $year)
            ->whereMonth('created_at', '<=', $currentMonth)
            ->groupBy('month')
            ->orderBy('month')
            ->get();
        $monthlyData = array_fill(1, $currentMonth, 0);
        foreach ($posts as $post) {
            $monthlyData[$post->month] = $post->total;
        }

        return response()->json([
            "data" => [
                'cardData' => [
                    'total_posts' => Post::count(),
                    'total_users' => User::count(),
                    'verified_users' => User::where('has_blue_tick', true)->count(),
                    'total_balance' => $totalAmount,
                ],
                'trendPosts' => $trendPosts,
                'monthly_posts' => array_values($monthlyData),
            ]
        ]);
    }
}
