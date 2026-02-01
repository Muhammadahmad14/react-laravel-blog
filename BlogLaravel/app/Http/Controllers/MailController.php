<?php

namespace App\Http\Controllers;

use App\Mail\UserBlockMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function sendEmail()
    {
        $to = 'ahmadbuzdar782@gmail.com';
        $subject = "Your BlogApp Account is Blocked";
        $message = "Hello, your account has been blocked due to policy violations. If you think this is a mistake, please contact support.";

        // Send mail using queue
        Mail::to($to)->queue(new UserBlockMail($message, $subject));

        return response()->json([
            'message' => 'Mail has been queued successfully'
        ]);
    }
}
