<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostLikeController extends Controller
{
    public function liketoggle(Request $request, $id)
    {
        $user = $request->user();
        $post = Post::findOrFail($id);
        if ($user->hasLiked($id)) {
            // Use User model's unlike method
            $user->unlike($id);
            return response()->json([
                "message" => "Unliked the post",
                "liked" => false,
                "total_likes" => $post->likeCount()
            ]);
        }

        // Use User model's like method
        $user->like($id);

        return response()->json([
            "message" => "Liked the post",
            "liked" => true,
            "total_likes" => $post->likeCount()
        ]);
    }
}
