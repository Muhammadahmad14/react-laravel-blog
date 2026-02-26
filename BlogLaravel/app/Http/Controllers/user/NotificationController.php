<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }
        return [
            'unreadNotifications' => $user->unreadNotifications,
            'readNotifications'   => $user->readNotifications,
        ];
    }

    public function markALLasRead()
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }
        $user->unreadNotifications->markAsRead();
        return response()->json([
            'message' => 'All notifications marked as read'
        ]);
    }

    public function markAsRead($id)
    {
        $user = auth()->user();
        $notification = $user->unreadNotifications()->find($id);

        if (!$notification) {
            return response()->json([
                'message' => 'Notification not found'
            ], 404);
        }

        $notification->markAsRead();

        return response()->json([
            'message' => 'Notification marked as read'
        ]);
    }
}
