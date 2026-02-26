<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Notifications\LikePost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostLikeController extends Controller
{
   public function liketoggle(Request $request, $id)
{
    $user = auth()->user();
    $post = Post::with('user:id,name')->findOrFail($id);

    if ($user->hasLiked($id)) {
        $user->unlike($id);

        return response()->json([
            "message" => "Unliked the post",
            "liked" => false,
            "total_likes" => $post->likeCount()
        ]);
    }

    DB::transaction(function () use ($user, $post) {
        $user->like($post->id);

        if (!$post->user->is($user)) {
            $post->user->notify(new LikePost([
                'message' => $user->name . ' liked your post',
                'post_id' => $post->id,
            ]));
        }
    });

    return response()->json([
        "message" => "Liked the post",
        "liked" => true,
        "total_likes" => $post->likeCount()
    ]);
}
}
