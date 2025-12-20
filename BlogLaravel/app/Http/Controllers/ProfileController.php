<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{

    public function show(Request $request, $id)
    {
        $user_id = Auth::id();
        $user = User::findOrFail($id);

        // If profile is private and viewer is not the owner
        if ($user->profile_status === 'private' && $user_id !== $user->id) {
            return response()->json([
                'message' => "User profile is private"
            ], 403);
        }

        // Only return safe fields
        $userData = $user->only([
            'id',
            'name',
            'email',
            'profile_img',
            'profile_status',
            'description',
            'created_at'
        ]);

        // Get followers and following users
        $followers = $user->followers()->select('id', 'name', 'profile_img')->get();
        $following = $user->following()->select('id', 'name', 'profile_img')->get();

        return response()->json([
            "user" => $userData,
            "followers_count" => $followers->count(),
            "following_count" => $following->count(),
            "followers" => $followers,
            "following" => $following
        ]);
    }


    public function update(Request $request, $id)
    {

        $request->validate([
            'name'   => ["required", "min:3"],
            'email'  => ["required", "email", "unique:users,email," . $id], // ignore current user
            'profile_img' => ["nullable", "image"],
            'profile_status' => ["required"],
            'description' => ["nullable", "max:255"],
        ]);

        $user = User::findOrFail($id);

        if (Auth::id() !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }


        if ($request->hasFile('profile_img')) {
            if ($user->profile_img && Storage::disk('public')->exists($user->profile_img)) {
                Storage::disk('public')->delete($user->profile_img);
            }

            $path = $request->file('profile_img')->store('profiles', 'public');
            $user->profile_img = $path;
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->profile_status = $request->profile_status;
        $user->description = $request->description; // can be null

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'profile_img' => $user->profile_img,
                'profile_status' => $user->profile_status,
                'description' => $user->description,
                'created_at' => $user->created_at,
            ]
        ]);
    }
}
