<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class SocialiteController extends Controller
{
    public function googleLogin()
    {
        return Socialite::driver('google')
            ->stateless()
            ->redirect();
    }

    public function authgoogle()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = User::where('google_id', $googleUser->id)
                    ->orWhere('email', $googleUser->email)
                    ->first();

        if (!$user) {
            $user = User::create([
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'password' => Hash::make(Str::random(16)),
                'google_id' => $googleUser->id,
            ]);
        }

        $token = $user->createToken('google_auth')->plainTextToken;

        return redirect(env('FRONTEND_URL') . '/google-callback?token=' . $token);
    }
}
