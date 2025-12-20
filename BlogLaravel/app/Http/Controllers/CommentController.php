<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function index($id){
        $comments = Comment::where("post_id",$id)->with("user")->get();

        return response()->json([
            "comments" => $comments
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'post_id' => ['required', 'exists:posts,id'],
            'body' => ['required', 'string', 'max:500'],
        ]);

        $comment = Comment::create([
            'user_id' => Auth::id(),
            'post_id' => $request->post_id,
            'body' => $request->body,
        ]);
        $comment->load('user');

        return response()->json([
            'message' => "Successfully added comment",
            'data' => $comment
        ], 201);
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'body' => ['required', 'string', 'max:500'],
        ]);

        $comment = Comment::findOrFail($id);

        if ($comment->user_id !== Auth::id()) {
            return response()->json([
                'message' => "User is not authorized"
            ], 403);
        }

        $comment->update([
            'body' => $request->body,
        ]);

        return response()->json([
            'message' => "Successfully updated comment",
            "comment" =>  $comment,
        ], 200);
    }


    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);

        if ($comment->user_id !== Auth::id()) {
            return response()->json([
                'message' => "User is not authorized"
            ], 403);
        }

        $comment->delete();
        return response()->json([
            'message' => "Successfully deleted comment"
        ], 200);
    }
}
