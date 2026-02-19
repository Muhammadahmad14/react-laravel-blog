<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class SettingController extends Controller
{
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required'],
            'new_password' => ['required', 'min:8']
        ]);
        /** @var \App\Models\User $user */
        $user = Auth::user();
        if (!$user->isAdmin()) {
            return response()->json([
                'message' => 'UnAuthorized'
            ], 403);
        }
        if (! Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'errors' => [
                    'password' => ['Password is not correct']
                ]
            ],422);
        }
        $user->password = $request->new_password;
        $user->save();

        return response()->json([
            'message' =>
            "Successfully Changed"
        ]);
    }
}
