<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowerController extends Controller
{

    public function followStatus(Request $request, $id)
    {
        $authUser = $request->user();          // logged-in user
        $profileUser = User::findOrFail($id);  // profile user

        $authFollowsProfile = $authUser->following()->where('following_id', $profileUser->id)->exists();
        $profileFollowsAuth = $profileUser->following()->where('following_id', $authUser->id)->exists();

        $status = 'Follow'; // default

        if ($authFollowsProfile && $profileFollowsAuth) {
            $status = 'Friends';
        } elseif ($authFollowsProfile) {
            $status = 'Following';
        } elseif ($profileFollowsAuth) {
            $status = 'Followed';
        }

        return response()->json([
            'status' => $status,
        ]);
    }


    public function toggleFollow(Request $request, $id)
    {
        $authUser = $request->user();
        $targetUser = User::findOrFail($id);

        if ($authUser->id === $targetUser->id) {
            return response()->json(['message' => 'You cannot follow yourself'], 400);
        }

        // Check if already following
        $isFollowing = $authUser->following()->where('following_id', $targetUser->id)->exists();

        if ($isFollowing) {
            // Unfollow
            $authUser->following()->detach($targetUser->id);
            $status = 'Unfollowed';
        } else {
            // Follow
            $authUser->following()->attach($targetUser->id);
            $status = 'Followed';
        }

        return response()->json([
            'message' => $status,
            'following' => !$isFollowing, // true if now following
        ]);
    }
}
