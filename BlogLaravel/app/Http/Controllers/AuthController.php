<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // get user
    public function user()
    {
        return Auth::user();
    }

    // register user
    public function register(Request $request)
    {
        $attributes = $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:8'],
        ]);

        User::create($attributes);

        return response()->json([
            'status' => 200,
            'message' => "Successfull created Account",
        ]);
    }

    // login 
    public function login(Request $request)
    {
        $attributes = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'min:8'],
        ]);

        if (!Auth::attempt($attributes)) {
            return response()->json([
                'message' => "Invalid credentials",
            ], 401);
        }
        $user = $request->user();
        $token = $user->createToken('auth_token', [$user->role])->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    // logout user
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Successfully Logout',
        ]);
    }
}
