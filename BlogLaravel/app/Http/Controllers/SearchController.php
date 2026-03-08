<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{
    public function Posts_Search($query)
    {

        $posts = Post::where('title', 'like', "%$query%")
            ->orWhere('body', 'like', "%$query%")
            ->with(['user', 'likes', 'comments'])
            ->withCount(['likes', 'comments'])
            ->get();

        $posts = $posts->transform(function ($post) {
            $post->liked_by_user = $post->likes->contains("user_id", Auth::id());
            return $post;
        });

        return response()->json([
            'posts' => $posts
        ]);
    }

    public function Users_Search($query)
    {

        $users = User::where('name', 'like', "%$query%")
            ->orWhere('description', 'like', "%$query%")
            ->get();

        return response()->json([
            'users' => $users
        ]);
    }
}
