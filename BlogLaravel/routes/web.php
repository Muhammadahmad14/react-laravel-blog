<?php

use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\Payment\PaymentController;
use App\Http\Controllers\Payment\SubscriptionController;

Route::get('/auth/google', [SocialiteController::class, 'googleLogin'])->name('auth.google');
Route::get('auth/google-callback', [SocialiteController::class, 'authgoogle'])->name('auth.google-callback');
Route::get('/login', [LoginController::class, 'showLogin'])->name('login');
Route::post('/login', [LoginController::class, 'login'])->name('login.submit');

Route::get('/register', [LoginController::class, 'showRegister'])->name('register');
Route::post('/register', [LoginController::class, 'register'])->name('register.submit');

Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/home', function () {
        return view('dashboard');
    })->name('home');
});

Route::get('/', [PaymentController::class, 'index']);
Route::post('/stripe', [PaymentController::class, 'store'])->name('stripe.payment');



Route::middleware('auth')->group(function () {
    Route::post('/subscribe', [SubscriptionController::class, 'createSubscription'])->name('subscribe');
});

Route::post('/stripe/webhook', [SubscriptionController::class, 'handleWebhook']);


Route::get('/send-mail',[MailController::class, 'sendEmail']);