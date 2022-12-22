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
                                            ->withoutMiddleware('isAdmin')
                                            ->withoutMiddleware('web');
            Route::post('/settings', 'settingsController@update');
            /*
                ************************************ Dashboard **********************************************
            */
            Route::get('/', 'dashboardController@index');
            Route::get('/dashboard', 'dashboardController@index');
            /*
                ************************************ Orders **********************************************
            */
            Route::group(
                ['prefix' => 'orders'],
                function () {
                    Route::get('/', 'ordersController@index');
                    Route::delete('/{user}/{order}', 'ordersController@destroy');
                    Route::post('/', 'ordersController@delete_all');
                    Route::put('/{user}/{order}', 'ordersController@approveOrder');
                }
            );
        });
        Route::post('/login', 'adminAuthController@login');
        Route::post('/logout', 'adminAuthController@logout')->middleware(['auth:sanctum', 'isAdmin']);
        Route::get('/user', [usersController::class, 'get_user'])->middleware('auth:sanctum');
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
                Route::post('/checkout', 'checkoutController@index');
                // Orders
                Route::group(['namespace' => '\App\Http\Controllers\Api\Admin\V1', 'prefix' => 'orders'], function () {
                    Route::get('/', 'ordersController@showClientOrders');
                    Route::delete('/{order}', 'ordersController@destroyClientOrder');
                    Route::post('/delete_all', 'ordersController@deleteAllClientOrders');
                });
                // Client Account
                Route::group(
                    ['prefix' => 'account'],
                    function () {
                        // Client Info
                        Route::group(['prefix' => 'client_info'], function () {
                            Route::get('/', 'clientInfoController@index');
                            Route::post('/', 'clientInfoController@createOrUpdateClientInfo');
                        }
                        );
                        // My account
                        Route::group(
                            ['prefix' => 'my_account'],
                            function () {
                                Route::get('/', 'myAccountController@index');
                                Route::put('/', 'myAccountController@update');
                                Route::delete('/', 'myAccountController@destroy');
                            }
                        );
                    }
                );
            });
        }
    );
    // Logout
    Route::post('/logout', '\App\Http\Controllers\Api\Client\authClientController@logout_client');
    // Search

    Route::get('/search/{table}/{value}/{cnt?}', [App\Http\Controllers\Api\Admin\V1\searchController::class, 'index'])
                ->whereAlpha('table')->middleware('auth:sanctum');
    Route::get('/user', [usersController::class, 'get_user'])->middleware('auth:sanctum');
});
Route::get('/login')->name('login');
