<?php

namespace App\Http\Traits;

trait HttpResponse
{
    /**
     * HttpResponse Success function.
     *
     * This function return json formatted data that the operation has been made successfully
     *
     * @param int $msg
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function success($data = null, string $msg = 'The operation has been made successfully', int $code = 200)
    {
        return response()->json([
            'data' => $data,
            'msg' => $msg,
            'code' => $code,
            'type' => 'success',
        ], $code)
                        ->header('Accept', 'application/vnd.api+json')
                        ->header('Content-Type', 'application/vnd.api+json');
    }

    /**
     * Httpresponse error function.
     *
     * This function returns a json formatted data that the request has some issues
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function error(string $msg, int $code, $data = null, bool $includeData = true)
    {
        $payload = [
            'data' => $data,
            'msg' => $msg,
            'code' => $code,
            'type' => 'error',
        ];
        if (!$includeData) {
            array_unshift($payload, $data);
        }

        return response()->json($payload, $code)
                ->header('Accept', 'application/vnd.api+json')
                ->header('Content-Type', 'application/vnd.api+json');
    }

    public function redirect_login(bool $isClient = false)
    {
        return redirect()->away(env('FRONTEND_URL', 'http://localhost:3000').($isClient ? '/login' : '/admin/login'), headers: ['Access-Control-Allow-Origin' => '*']);
    }

    public function not_authorized_response(bool $isClient = false)
    {
        return $this->error('You are not authenticated', 403, ['redirect_url' => env('FRONTEND_URL', 'http://localhost:3000').($isClient ? '/login' : '/admin/login')]);
    }

    public function not_authorized()
    {
        throw new \Illuminate\Auth\AuthenticationException();
    }

    public function not_found()
    {
        return $this->error('This page is not found', 404);
    }

    public function validation_errors($data)
    {
        return $this->error('validation errors', 422, $data);
    }
}
