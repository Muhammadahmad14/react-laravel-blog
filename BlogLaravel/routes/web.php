<?php

use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('header');
});

Route::get("/user/{name}",function ($name){
    return "WElcome ". $name;
});

Route::get('/search', [SearchController::class, 'index'])->name('search');

