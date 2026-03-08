<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = auth()->user();
    }

    public function index()
    {
        $user = $this->user;
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

    public function unreadCount()
    {
        $user = $this->user;
        if (!$user) return response()->json([
            'message' => 'Unauthenticated'
        ], 401);

        return [
            'count' => $user->unreadNotifications()->count(),
        ];
    }

    public function markALLasRead()
    {
        $user = $this->user;
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
        $user = $this->user;
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

    public function destroy($id)
    {
        $user = $this->user;
        $notification = $user->notifications()->findOrFail($id);

        if (!$notification) {
            return response()->json([
                'message' => 'Notification not found'
            ], 404);
        }
        $notification->delete();
        return response()->json([
            'message' => 'Notification deleted'
        ]);
    }

    public function destroyAll()
    {
        $user = $this->user;
        $user->readNotifications()->delete();
        return response()->json([
            'message' => 'Notification deleted'
        ]);
    }
}
