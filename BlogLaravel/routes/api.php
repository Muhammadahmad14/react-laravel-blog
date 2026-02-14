<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ManageCommentController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\ForgetPasswordController;
use App\Http\Controllers\Payment\SubscriptionController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostLikeController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\user\SettingController;
use App\Http\Middleware\isAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ManageUserController;
use App\Http\Controllers\Admin\ManagePostController;
use App\Http\Controllers\Admin\SettingController as AdminSettingController;
use App\Http\Controllers\Admin\TagController as AdminTagController;

// Google 
Route::get('/auth/google', [SocialiteController::class, 'googleLogin']);
Route::get('/auth/google-callback', [SocialiteController::class, 'authgoogle']);
// Auth Routes
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register']);

Route::middleware("auth:sanctum")->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get("/me", function (Request $request) {
        return $request->user();
    });
});

Route::post('/subscribe', [SubscriptionController::class, 'createSubscription'])->middleware("auth:sanctum");
Route::post('/stripe/webhook', [SubscriptionController::class, 'handleWebhook']);

// user profile routes
Route::prefix('profile')->middleware('auth:sanctum')->group(function () {
    Route::get('/{id}', [ProfileController::class, 'show']);
    Route::patch('/{id}', [ProfileController::class, 'update']);
});

// setting routes
Route::prefix("settings")->middleware("auth:sanctum")->group(function () {
    Route::put('/changeemail/{id}', [SettingController::class, 'changeEmail']);
    Route::put('/changepassword/{id}', [SettingController::class, 'changePassword']);
    Route::put('/changestatus/{id}', [SettingController::class, 'changeProfileStatus']);
});


// admin routes
Route::get('/admin/dashboard', function () {
    return response()->json(['message' => 'Admin dashboard data']);
})->middleware(['auth:sanctum', 'ability:admin']);

Route::get('/user/dashboard', function () {
    return response()->json(['message' => 'user dashboard data']);
})->middleware(['auth:sanctum', 'ability:user']);

// Post Routes
Route::prefix("posts")->middleware("auth:sanctum")->group(function () {
    Route::get("/", [PostController::class, 'index']);
    Route::get('/user/{id}', [PostController::class, 'getUserPosts']);
    Route::get('/tag/{tag}', [PostController::class, 'getTagPosts']);
    Route::post("/", [PostController::class, 'store']);
    Route::put("/{id}", [PostController::class, 'update'])->whereNumber('id');
    Route::delete("/{id}", [PostController::class, 'destroy'])->whereNumber('id');
    Route::get("/{slug}", [PostController::class, 'show'])->where('slug', '[A-Za-z0-9-]+');
});


// likes
Route::middleware('auth:sanctum')->post('/post/{id}/toggle-like', [PostLikeController::class, 'liketoggle']);

// comments
Route::prefix("comments")->middleware("auth:sanctum")->group(function () {
    Route::get("/{id}", [CommentController::class, 'index']);
    Route::post("/", [CommentController::class, 'store']);
    Route::put("/{id}", [CommentController::class, 'update']);
    Route::delete("/{id}", [CommentController::class, 'destroy']);
});


// followers
Route::prefix("follower")->middleware("auth:sanctum")->group(function () {
    Route::get("/{id}", [FollowerController::class, 'getFollowers']);
    Route::get("/status/{id}", [FollowerController::class, 'followStatus']);
    Route::post("/toggleFollow/{id}", [FollowerController::class, 'toggleFollow']);
});

// getFollowings
Route::get("followings/{id}", [FollowerController::class, 'getFollowings'])->middleware("auth:sanctum");





// Searches Routes
Route::middleware("auth:sanctum")->group(function () {
    Route::get("/posts/{query}/search-result", [SearchController::class, 'Posts_Search']);
    Route::get("/users/{query}/search-result", [SearchController::class, 'users_Search']);
});


Route::prefix('forget-password')->group(function () {
    Route::post('/send-otp', [ForgetPasswordController::class, 'sendOtp']);
    Route::post('/verify-otp', [ForgetPasswordController::class, 'verifyOtp']);
    Route::post('/reset', [ForgetPasswordController::class, 'resetPassword']);
});




// admin routes 
Route::middleware(['auth:sanctum', isAdmin::class])
    ->prefix('admin')
    ->group(function () {
        Route::get('/dashboard', DashboardController::class);

        // Users
        Route::prefix('users')->controller(ManageUserController::class)->group(function () {
            Route::get('/', 'index');
            Route::get('/verified/transactions', 'verifiedUsersTransactions');
            Route::put('/{id}/status', 'changeStatus');
            Route::put('/{id}/role', 'changeRole');
        });

        // Posts
        Route::prefix('posts')->controller(ManagePostController::class)->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('/stats/yearly', 'yearlyPosts');
            Route::get('/tag/{tag}', 'postByTag');
            Route::get('/{slug}', 'show');
            Route::put('/{id}', 'update');
            Route::delete('/{id}', 'destroy');
        });


        // Comments
        Route::get('/comments/{id}', [ManageCommentController::class, 'index']);
        Route::put('/comments/{id}', [ManageCommentController::class, 'update']);
        Route::delete('/comments/{id}', [ManageCommentController::class, 'destroy']);

        // Tags
        Route::get('/tags', [AdminTagController::class, 'index']);
        Route::get('/tags/{id}', [AdminTagController::class, 'show']);
        Route::post('/tags', [AdminTagController::class, 'store']);
        Route::put('/tags/{id}', [AdminTagController::class, 'update']);
        Route::delete('/tags/{id}', [AdminTagController::class, 'destroy']);


        // Users
        Route::get('/users', [ManageUserController::class, 'index']);
        Route::get('/users/search', [ManageUserController::class, 'searchUser']);
        Route::get('/users/verified/transactions', [ManageUserController::class, 'verifiedUsersTransactions']);
        Route::patch('/users/{id}/status', [ManageUserController::class, 'changeStatus']);
        Route::patch('/users/{id}/role', [ManageUserController::class, 'changeRole']);

        // Posts
        Route::get('/posts', [ManagePostController::class, 'index']);
        Route::post('/posts', [ManagePostController::class, 'store']);
        Route::get('/posts/{slug}', [ManagePostController::class, 'show']);
        Route::get('/posts/tag/{tag}', [ManagePostController::class, 'postByTag']);
        Route::patch('/posts/{id}', [ManagePostController::class, 'update']);
        Route::delete('/posts/{id}', [ManagePostController::class, 'destroy']);
        Route::get('/posts/stats/yearly', [ManagePostController::class, 'yearlyPosts']);
        Route::get('/posts/search/{query}', [ManagePostController::class, 'searchPosts']);

        // Comments
        Route::get('/posts/{postId}/comments', [ManageCommentController::class, 'index']);
        Route::patch('/comments/{id}', [ManageCommentController::class, 'update']);
        Route::delete('/comments/{id}', [ManageCommentController::class, 'destroy']);

        Route::patch('/settings/change-password', [AdminSettingController::class, 'changePassword']);
    });
