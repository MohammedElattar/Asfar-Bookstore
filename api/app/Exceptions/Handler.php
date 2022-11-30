<?php

namespace App\Exceptions;

use App\Http\Traits\HttpResponse;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException as methodNotAllowedApiException;

class Handler extends ExceptionHandler
{
    use HttpResponse;
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (\Throwable $e) {
        });

        // Handle User not authenticated
        $this->renderable(function (\Illuminate\Auth\AuthenticationException $e, $request) {
            if ($request->is('api/*')) {
                return $this->error("You are not authenticated" , 401);
            }
        });

        // Handle Method Not Allowed Exception
        $this->renderable(function(methodNotAllowedApiException $e , $request){
            if($request->is("api/*")){
                return $this->error($e->getMessage() , 403);
            }
        });
    }
}
