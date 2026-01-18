<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingController extends Controller
{


    public function changeEmail(Request $request, $id)
    {
        $request->validate([
            'email' => [
                'required',
                'email',
                'unique:users,email,' . $id
            ],
            'password' => ['required'],
        ]);

        $user = User::findOrFail($id);

        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'errors' => [
                    'password' => ['Password is not correct']
                ]
            ], 422);
        }


        if ($request->user()->is($user)) {
            $user->email = $request->email;
            $user->save();

            return response()->json([
                "message" => "Email successfully changed",
            ]);
        }

        return response()->json([
            "error" => "Failed to change the email"
        ], 403);
    }



    public function changePassword(Request $request, $id)
    {
        $request->validate([
            'password' => ['required'],
            'newPassword' => ['required', 'min:8'],
        ]);

        $user = User::findOrFail($id);

        if (! $request->user()->is($user)) {
            return response()->json([
                'error' => 'Unauthorized'
            ], 403);
        }

        if (! Hash::check($request->password, $user->password)) {
            return response()->json([
                'errors' => [
                    'password' => ['Password is not correct']
                ]
            ], 422);
        }

        $user->password = Hash::make($request->newPassword);
        $user->save();

        return response()->json([
            'message' => 'Password successfully changed'
        ]);
    }

    public function changeProfileStatus(Request $request, $id)
    {
        $request->validate([
            'profile_status' => ['required', Rule::in(['public', 'private', 'friends'])],
        ]);

        $user = User::findOrFail($id);
        if ($request->user()->is($user)) {
            $user->profile_status = $request->profile_status;
            $user->save();
            return response()->json([
                "message" => "Status Successfully Chnaged"
            ]);
        }

        return response()->json([
            "error" => "Faild to change the Status"
        ]);
    }
}
