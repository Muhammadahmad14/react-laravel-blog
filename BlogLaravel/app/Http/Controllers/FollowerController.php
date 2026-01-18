<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Expr\FuncCall;

use function Pest\Laravel\json;

class FollowerController extends Controller
{

    private function getFollowStatus($authUser, $profileUser)
    {
        $authFollowsProfile = $authUser->following()
            ->where('following_id', $profileUser->id)
            ->exists();

        $profileFollowsAuth = $profileUser->following()
            ->where('following_id', $authUser->id)
            ->exists();

        if ($authFollowsProfile && $profileFollowsAuth) {
            return 'Friends';
        } elseif ($authFollowsProfile) {
            return 'Following';
        } elseif ($profileFollowsAuth) {
            return 'Follow Back';
        }

        return 'Follow';
    }

    public function followStatus(Request $request, $id)
    {
        $authUser = $request->user();
        $profileUser = User::findOrFail($id);

        $status = $this->getFollowStatus($authUser, $profileUser);

        return response()->json([
            'status' => $status
        ]);
    }


    public function toggleFollow(Request $request, $id)
    {
        $authUser = $request->user();
        $targetUser = User::findOrFail($id);

        if ($authUser->id === $targetUser->id) {
            return response()->json([
                'message' => 'You cannot follow yourself'
            ], 400);
        }

        $isFollowing = $authUser->following()
            ->where('following_id', $targetUser->id)
            ->exists();

        if ($isFollowing) {
            $authUser->following()->detach($targetUser->id);
        } else {
            $authUser->following()->attach($targetUser->id);
        }

        // 🔥 return updated status
        $status = $this->getFollowStatus($authUser, $targetUser);

        return response()->json([
            'status' => $status
        ]);
    }

    public function getFollowers($id)
    {
        $user = User::findOrFail($id);

        $followers = $user->followers()->get()->map(function ($follower) {
            return [
                'id' => $follower->id,
                'name' => $follower->name,
                'profile_img' => $follower->profile_img,
                'profile_status' => $follower->profile_status,
                'description' => $follower->description,
                'about' => $follower->about
            ];
        });

        return response()->json([
            'followers' => $followers
        ]);
    }

    public function getFollowings($id)
    {
        $user = User::findOrFail($id);

        $followings = $user->following()
            ->get()->map(function ($following) {
                return [
                    'id' => $following->id,
                    'name' => $following->name,
                    'profile_img' => $following->profile_img,
                    'profile_status' => $following->profile_status,
                    'description' => $following->description,
                    'about' => $following->about
                ];
            });;

        return response()->json([
            'followings' => $followings
        ]);
    }
}
