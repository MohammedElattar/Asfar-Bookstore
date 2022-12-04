<?php

use App\Http\Controllers\books;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([ 'prefix' => 'admin', 'namespace' => '\App\Http\Controllers\Api\Admin'], function () {
    // v1
    Route::group(['prefix' => 'v1', 'namespace' => 'V1' , 'middleware' => ['auth:sanctum']], function () {
        // Route::post("/books" , [books::class , 'index']);

        // uncomment this to enable authentication

        Route::apiResource("/categories", categoriesController::class);
        // Route::apiResource("/categories", categoriesController::class)->withoutMiddleware("auth:sanctum");

    });
    Route::post("/login" , 'adminAuthController@login');
    Route::post("/logout" , 'adminAuthController@logout');
});
