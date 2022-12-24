<?php

namespace App\Http\Controllers\Api\Client\V1;

use App\Http\Controllers\Api\Admin\V1\ordersController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Checkout\checkoutRequest;
use App\Http\Traits\HttpResponse;
use App\Http\Traits\userTrait;
use App\Models\Api\Admin\V1\Order;
use Illuminate\Support\Facades\DB;

class checkoutController extends Controller
{
    use userTrait;
    use HttpResponse;

    /**
     * Summary of index.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(checkoutRequest $req)
    {
        $er = [];
        $cnt = 0;
        $cartItems = DB::table('carts')
                        ->join('books', 'books.id', 'carts.book_id')
                        ->select(
                            'books.id as book_id',
                            'books.quantity as book_qty',
                            'books.price as price',
                            'carts.quantity as cart_qty'
                        )
                        ->where('carts.user_id', $this->user_id())
                        ->get();
        foreach ($cartItems as $item) {
            $item = is_object($item) ? $item : (object) $item;
            if ($item->cart_qty > $item->book_qty) {
                $er[$item->book_id] = 'qty-big';
            }
            ++$cnt;
        }

        if ($er) {
            return $this->validation_errors($er);
        }
        if (!$cnt) {
            return $this->success(code: 204);
        }
        // Order inforamtion is valid , so add it
        $order_details = [];
        foreach ($cartItems as $item) {
            $item = is_object($item) ? $item : (object) $item;
            $order_details[$item->book_id] = $item->cart_qty;
        }
        $order = new ordersController();

        return $order->addOrder($req, $order_details);
    }
}
