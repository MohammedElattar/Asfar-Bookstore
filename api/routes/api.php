<?php

use App\Http\Controllers\Api\Admin\V1\usersController;
use Illuminate\Support\Facades\Route;

/************************************************************ Admin ***************************************************/
Route::group(['middleware' => ['web']], function () {
    Route::group(['prefix' => 'admin', 'namespace' => '\App\Http\Controllers\Api\Admin'], function () {
        // v1
        Route::group(['prefix' => 'v1', 'namespace' => 'V1', 'middleware' => ['auth:sanctum', 'isAdmin']], function () {
            /*
                Add ->withoutMiddleware("auth:sanctum") to disable authentication
                * Like That :
                    * Route::apiResource("/categories", categoriesController::class)->withoutMiddleware("auth:sanctum");
             */

            /*
                ******************************* Categories **********************************************
             */
            Route::delete('/categories/delete_all', 'categoriesController@delete_all');
            Route::apiResource('/categories', categoriesController::class);
            /*
                ************************************ Books **********************************************
             */
            Route::get('/books/categories', 'categoriesController@get_all_enabled_categories');
            Route::delete('/books/delete_all', 'booksController@delete_all');
            Route::apiResource('/books', booksController::class);
            Route::post('/books/{book}', 'booksController@update')->where('book', '[0-9]+');

            /*
               ************************************ Users **********************************************
            */
            Route::delete('/users/delete_all', 'usersController@delete_all');
            Route::apiResource('users', 'usersController');
            Route::patch('/users/{user}', 'usersController@changeStatus');
            /*
               ************************************ Settings **********************************************
            */
            Route::get('/settings', 'settingsController@index')
                                            ->withoutMiddleware('auth:sanctum')
                                            ->withoutMiddleware('web');
            Route::post('/settings', 'settingsController@update');
            /*
                   ************************************ Dashboard **********************************************
                */
            Route::get('/', 'dashboardController@index');
            Route::get('/dashboard', 'dashboardController@index');
        });
        Route::post('/login', 'adminAuthController@login');
        Route::post('/logout', 'adminAuthController@logout')
            ->middleware('auth:sanctum')
            ->middleware('isAdmin');
    });

    /************************************************************ Client ***************************************************/

    Route::group(
        ['namespace' => "App\Http\Controllers\Api\Client"],
        function () {
            Route::group(
                ['prefix' => 'register'],
                function () {
                    Route::post('', 'authClientController@register');
                }
            );
            Route::group(
                ['prefix' => 'login'],
                function () {
                    Route::get('/', 'authClientController@index');
                    Route::post('/', 'authClientController@login');
                    Route::group([], function () {
                        // *************************************** Github ***************************************//

                        // redirect
                        Route::get('/github/redirect', 'authClientController@loginGithubRedirect')->name('github_redirect');
                        // callback
                        Route::get('/github/callback', 'authClientController@loginGithubCallback');

                        // *************************************** Google ***************************************//

                        // redirect
                        Route::get('/google/redirect', 'authClientController@loginGoogleRedirect')->name('google_redirect');
                        // callback
                        Route::get('/google/callback', 'authClientController@loginGoogleCallback');

                        // *************************************** Facebook ***************************************//

                        // redirect
                        Route::get('/facebook/redirect', 'authClientController@loginFacebookRedirect')->name('facebook_redirect');
                        // callback
                        Route::get('/facebook/callback', 'authClientController@loginFacebookCallback');
                    }
                    );
                }
            );
            Route::group(['namespace' => 'V1', 'middleware' => 'auth:sanctum'], function () {
                // Books
                Route::get('/books', 'clientBooks@index')->withoutMiddleware('auth:sanctum');
                Route::get('/books/{book}', 'clientBooks@show')->withoutMiddleware('auth:sanctum');
                // Cart
                Route::get('/cart', 'cartController@index');
                Route::match(['post', 'put'], '/cart', 'cartController@validate_books_response');
                Route::delete('/cart', 'cartController@destroy');
            });
        }
    );

    // Search

    Route::get('/search/{table}/{value}/{cnt?}', [App\Http\Controllers\Api\Admin\V1\searchController::class, 'index'])
                ->whereAlpha('table')->middleware('auth:sanctum');
    Route::get('/user', [usersController::class, 'get_user'])->middleware('auth:sanctum');
});
Route::get('/login')->name('login');
