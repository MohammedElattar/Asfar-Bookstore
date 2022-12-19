<?php

namespace App\Http\Middleware;

use App\Http\Traits\HttpResponse;
use App\Http\Traits\userTrait;
use App\Models\Api\Client\V1\Cart;
use Illuminate\Http\Request;

class checkCart
{
    use userTrait;
    use HttpResponse;

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     *
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function handle(Request $request, \Closure $next)
    {
        $cartItems = Cart::where('user_id', $this->user_id())->limit(1)->first('id');
        if (!$cartItems) {
            return $this->success(null, 'No Content', 204);
        }

        return $next($request);
    }
}
