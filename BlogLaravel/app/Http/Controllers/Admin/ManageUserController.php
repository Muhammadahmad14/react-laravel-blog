<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\UserBlockMail;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class ManageUserController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->query('status');
        $users = User::withCount('posts')
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->paginate(10);
        return response()->json([
            'users' => $users
        ]);
    }

    public function searchUser(Request $request)
    {
        $query = $request->query('q');

        $users = User::when($query, fn($q) => $q->whereFullText(['name', 'description', 'about'], $query))
            ->withCount('posts')
            ->paginate(10, ['id', 'name', 'role', 'profile_img', 'created_at']);

        return response()->json([
            'users' => $users,
        ]);
    }
    public function verifiedUsersTransactions()
    {
        $transactions = Transaction::with('user:id,name,email')
            ->whereHas('user', function ($query) {
                $query->where('has_blue_tick', true);
            })
            ->paginate(10);

        return response()->json([
            'transactions' => $transactions,
        ]);
    }

    public function changeStatus(Request $request, $id)
    {
        $request->validate([
            'status' => ['required', 'in:active,blocked']
        ]);

        /**  @var App\Models\User $admin   */
        $admin = Auth::user();
        if (!$admin->isAdmin()) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $user = User::findOrFail($id);

        if ($user->is($admin)) {
            return response()->json(['message' => 'You cannot modify your own account'], 403);
        }

        $user->status = $request->status;
        $user->save();

        $subject = $request->status === 'active'
            ? "Your BlogApp Account Has Been Unblocked"
            : "Your BlogApp Account Has Been Blocked";

        $message = "Hello {$user->name}, your account has been {$request->status} by the admin due to policy violations.";

        Mail::to($user->email)->queue(new UserBlockMail($message, $subject));


        return response()->json([
            'message' => 'User status updated',
            'status' => $user->status
        ]);
    }
    public function changeRole(Request $request, $id)
    {
        $request->validate([
            'role' => ['required', 'in:user,admin']
        ]);
        /**  @var App\Models\User $admin   */
        $admin = Auth::user();
        if (!$admin->isAdmin()) {
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }
        $user = User::findOrFail($id);
        if ($user->is($admin)) {
            return response()->json([
                'message' => 'You cannot modify your own account'
            ], 403);
        }

        $user->role = $request->role;
        $user->save();

        return response()->json([
            'message' => "Successfully Changed"
        ]);
    }
}
