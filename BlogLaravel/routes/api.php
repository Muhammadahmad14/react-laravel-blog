<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostLikeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\user\SettingController;
use Faker\Guesser\Name;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// user routes
// Auth Routes
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register']);

Route::middleware("auth:sanctum")->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get("/me", function (Request $request) {
        return response()->json([
            'user' =>  $request->user()
        ]);
    });
});



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
