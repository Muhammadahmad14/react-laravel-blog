<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{
    public function Posts_Search($query)
{

    $posts = Post::search($query)->get();

    $posts->loadCount(['likes', 'comments']);
    $posts->load('user');

    $posts = $posts->transform(function ($post) {
        $post->liked_by_user = $post->likes->contains("user_id",Auth::id());
        return $post;
    });

    return response()->json([
        'posts' => $posts
    ]);
}


    public function Users_Search($query)
    {

        $users = User::search($query)->get();

        
        return response()->json([
            'users' => $users
        ]);
    }
}
