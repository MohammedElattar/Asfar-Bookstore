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
Route::group(['prefix' => 'admin', 'namespace' => '\App\Http\Controllers\Api\Admin'], function () {
    // v1
    Route::group(['prefix' => 'v1', 'namespace' => 'V1', 'middleware' => ['auth:sanctum']], function () {
        /*
            Add ->withoutMiddleware("auth:sanctum") to disable authentication
            * Like That :
                *Route::apiResource("/categories", categoriesController::class)->withoutMiddleware("auth:sanctum");
         */

        /*
            ******************************* Categories **********************************************
         */
        Route::apiResource('/categories', categoriesController::class);
        Route::delete('/categories/delete_all', 'categoriesController@delete_all');

        /*
            ************************************ Books **********************************************
         */
        Route::apiResource('/books', booksController::class);
        Route::match('POST', '/books/{book}', 'booksController@update')->where('book', '[0-9]+');
        Route::delete('/books/delete_all', 'booksController@delete_all');
    });
    Route::post('/login', 'adminAuthController@login');
    Route::post('/logout', 'adminAuthController@logout')->middleware('auth:sanctum');
});

Route::get('/search/{table}/{value}/{cnt?}', [App\Http\Controllers\Api\Admin\V1\searchController::class, 'index'])
            ->whereAlpha('table')->middleware('auth:sanctum');

Route::get('/login')->name('login');
