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
        $search = $request->query('search');
        $postId = $request->query('post_id');
        $commentId = $request->query('comment_id');

        $users = User::withCount('posts')
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'LIKE', '%' . $search . '%');
                });
            })
            ->when($postId, fn($q) => $q->whereRelation('posts', 'id', $postId))
            ->when($commentId, fn($q) => $q->whereRelation('comments','id',$commentId))
            ->when()
            ->latest('created_at')
            ->paginate(10, ['id', 'name', 'email', 'profile_img', 'has_blue_tick', 'status', 'role', 'created_at']);
        return response()->json([
            'users' => $users
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

        $subjectText = $request->status === 'active'
            ? "Your BlogApp Account Has Been Unblocked enjoy blogging again and connect with your followers"
            : "Your BlogApp Account Has Been Blocked by the admin due to policy violations";

        $message = "Hello {$user->name},{$request->status}, {$subjectText}";
        Mail::to($user->email)->queue(new UserBlockMail($message, $subjectText));


        return response()->json([
            'message' => 'User status updated',
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
