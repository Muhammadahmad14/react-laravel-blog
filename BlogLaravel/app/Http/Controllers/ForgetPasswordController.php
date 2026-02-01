<?php

namespace App\Http\Controllers;

use App\Mail\OtpMail;
use App\Models\Otp;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class ForgetPasswordController extends Controller
{
    public function sendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email'
        ]);

        $user = User::where('email', $request->email)->first();

        // Delete old pending OTPs
        Otp::where('user_id', $user->id)
            ->where('status', 'pending')
            ->delete();

        $otpCode = rand(100000, 999999);

        Otp::create([
            'user_id'     => $user->id,
            'otp'         => $otpCode,
            'expires_at'  => now()->addMinutes(2),
            'status'      => 'pending',
        ]);

        Mail::to($user->email)->send(new OtpMail($otpCode));

        return response()->json([
            'message' => 'OTP sent to your email (expires in 2 minutes)'
        ]);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp'   => 'required|digits:6',

        ]);

        $user = User::where('email', $request->email)->first();

        $otp = Otp::where('user_id', $user->id)
            ->where('status', 'pending')
            ->latest()
            ->first();

        if (!$otp) {
            return response()->json(['message' => 'No OTP found'], 404);
        }

        if (now()->gt($otp->expires_at)) {
            $otp->update(['status' => 'expired']);
            return response()->json(['message' => 'OTP expired'], 400);
        }

        if ($request->otp != $otp->otp) {
            return response()->json(['message' => 'Invalid OTP'], 400);
        }

        $otp->update(['status' => 'used']);

        return response()->json([
            'message' => 'OTP verified successfully',
        ]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email'    => 'required|email|exists:users,email',
            'password' => 'required|confirmed|min:6',
        ]);

        $user = User::where('email', $request->email)->first();

        $otp = Otp::where('user_id', $user->id)
            ->where('status', 'used')
            ->first();

        if (!$otp) {
            return response()->json([
                'message' => 'Invalid or expired reset token'
            ], 403);
        }

        $user->password = bcrypt($request->password);
        $user->save();

        // Remove token after successful reset
        $otp->delete();

        return response()->json([
            'message' => 'Password reset successfully'
        ]);
    }
}
