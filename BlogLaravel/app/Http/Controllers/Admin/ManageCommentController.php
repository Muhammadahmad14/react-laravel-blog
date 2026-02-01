<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ManageCommentController extends Controller
{
     public function index($id)
    {
        $comments = Comment::with('user:id,name')->where('post_id', $id)
            ->latest()
            ->paginate(5);

        return response()->json([
            'comments' => $comments
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => ['required', 'in:approved,spam']
        ]);
        /** @var \App\Models\User $user */
        $user = Auth::user();
        if (!$user->isAdmin()) {
            return response()->json([
                'message' => "Forbidden"
            ], 403);
        }
        $comment = Comment::findOrFail($id);
        $comment->status = $request->status;
        $comment->save();

        return response()->json([
            'message' => "Successfully updated"
        ]);
    }

    public function destroy($id)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        if (!$user->isAdmin()) {
            return response()->json([
                'message' => "Forbidden"
            ], 403);
        }
        $comment = Comment::findOrFail($id);
        $comment->delete();

        return response()->json([
            'message' => "Successfully deleted"
        ]);
    }
}
