<?php

use App\Http\Controllers\Admin\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

Route::post('/admin/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest:admin')
    ->name('login');

Route::post('/admin/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:admin')
    ->name('logout');
