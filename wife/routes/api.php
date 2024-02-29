<?php

use App\Http\Controllers\Admin\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('admin')->group(function () {
    // Route::delete('/users', [UserController::class, 'destroyMultiple']);
    // Route::delete('/brands', [BrandController::class, 'destroyMultiple']);

    Route::apiResources([
        'users' => UserController::class,
        // 'brands' => BrandController::class,
        // 'categories' => CategoryController::class,
    ]);

    // Route::get('/search', [SearchController::class, 'search']);
});
