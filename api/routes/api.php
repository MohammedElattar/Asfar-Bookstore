<?php

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
        Route::post("/books" , function(){
            return json_encode("This is Books");
        });
    });
    Route::post("/v1/auth" , 'V1\authController@login');
});
Route::get("/test" , function(){return "Hi";});
