<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class ProfileController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function show(Request $request, $id)
    {
        $user_id = Auth::id();
        $user = User::findOrFail($id);

        if ($user->profile_status === 'private' && $user_id !== $user->id) {
            return response()->json([
                'message' => "User profile is private",
            ], 403);
        }
        if ($user->profile_status === 'friends' && $user_id !== $user->id) {
            if (strtolower($this->userService->getFollowStatus(Auth::user(), $user)) !== "friends") {
                return response()->json([
                    'message' => "User profile is private",
                ], 403);
            }
        }
        $userData = $user->only([
            'id',
            'name',
            'email',
            'profile_img',
            'profile_status',
            'description',
            'about',
            'created_at'
        ]);


        $followers = $user->followers()->count();
        $following = $user->following()->count();

        return response()->json([
            "user" => $userData,
            "followers_count" => $followers,
            "following_count" => $following,
        ]);
    }



    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => ["required", "min:3"],
            'profile_img' => ["nullable", "image"],
            'description' => ["nullable"],
            'about' => ["nullable"],
        ]);

        $user = User::findOrFail($id);

        if (Auth::id() !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($request->removeImage) {
            if ($user->profile_img && Storage::disk('public')->exists($user->profile_img)) {
                Storage::disk('public')->delete($user->profile_img);
            }
            $user->profile_img = null;
        }

        if ($request->hasFile('profile_img')) {
            if ($user->profile_img && Storage::disk('public')->exists($user->profile_img)) {
                Storage::disk('public')->delete($user->profile_img);
            }
            $path = $request->file('profile_img')->store('UserProfiles', 'public');
            $user->profile_img = $path;
        }

        $user->name = $request->name;
        $user->description = $request->description;
        $user->about = $request->about;


        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }
}
