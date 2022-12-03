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
        Route::post("/books" , [books::class , 'index']);
    });
    Route::post("/login" , 'adminAuthController@login');
});
Route::get("/test" , function(){return "Hi";});

Route::get("/login", function () {
    return "This is login Page";
})->name("login");


// http://localhost:8000/api/dashboard

Route::post("/dashboard" , function(){return "This is Dashboard";})->middleware("auth:sanctum");