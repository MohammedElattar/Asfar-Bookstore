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
    public function success(array $data, string $msg = 'The operation has been made successfully', int $code = 200)
    {
        return response()->json([
            'data' => $data,
            'msg' => $msg,
            'code' => $code,
            'type' => 'success'
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
    public function error(string $msg, int $code, array $data = [])
    {
        return response()->json([
            'data' => $data,
            'msg' => $msg,
            'code' => $code,
            'type' => 'error'
        ], $code);

    }
}
