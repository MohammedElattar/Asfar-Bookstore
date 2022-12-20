<?php

namespace App\Http\Controllers\Api\Admin\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\admin\v1\ordersCollection;
use App\Http\Traits\HttpResponse;
use App\Http\Traits\userTrait;
use App\Models\Api\Admin\V1\Book;
use App\Models\Api\Admin\V1\Order;
use App\Models\Api\Client\V1\Cart;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ordersController extends Controller
{
    use userTrait;
    use HttpResponse;
    private $paginateCnt = 10;

    /*
    ******************************************************************
    ******* Admin
    ******************************************************************
    */
    /**
     * Display a listing of the resource.
     *
     * @return ordersCollection
     */
    public function index($Client = false)
    {
        $orders = DB::table('orders')
            ->join('users', 'users.id', 'orders.user_id')
            ->select(
                'orders.id',
                'users.id as user_id',
                'users.name as client_name',
                'orders.email as email',
                'orders.first_name as first_name',
                'orders.last_name as last_name',
                'orders.city as city',
                'orders.address as address',
                'orders.main_phone as main_phone',
                'orders.second_phone as second phone',
                'orders.more_info as more_info',
                'orders.status as status',
                'orders.created_at as created_at'
            )
            ->paginate($this->paginateCnt);

        // Get order details for user
        $orders_details = [];
        foreach (Order::where('user_id', $this->user_id())->get(['order_details as det', 'id']) as $i) {
            // Add order details to response using BST
            $id = $i->id;
            $i = json_decode($i['det'], true);
            $book_ids = @array_keys($i) or null;
            foreach ($book_ids as $book_id) {
                if ($book_id) {
                    $book_info = Book::where('id', $book_id)->first(['title', 'price', 'img']);
                    $book_info->id = $book_id;
                    $book_info->qty = $i[$book_id];
                    $book_info->img = filter_var($book_info->img, FILTER_VALIDATE_URL) ? $book_info->img : env('FRONTEND_URL', 'http://localhost:3000').("/storage/books/{$book_info->img}");
                    $orders_details[(int) $id][] = $book_info;
                }
            }
        }
        foreach ($orders as $order) {
            if (isset($orders_details[$order->id])) {
                $order->order_details = $orders_details[$order->id];
            }
        }

        return new ordersCollection($orders);
    }

    public function approveOrder(User $user , Order $order){
        if($order->status == '0'){
            $order->status = '1';
            $order->update();
            return $this->success(msg: 'Order approved successfully');
        }
        return $this->success(code: 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(User $user, Order $order)
    {
        Order::where('user_id', $user->id)->where('id', $order->id)->delete();

        return $this->success(msg: 'Order deleted successfully');
    }

    public function delete_all()
    {
        DB::delete('DELETE FROM orders');

        return $this->success(msg: 'All orders deleted successfully');
    }

    /*
    ******************************************************************
    ******* Client
    ******************************************************************
    */

    /**
     * Add Order after checkout.
     *
     * @param \App\Http\Requests\Client\Checkout\checkoutRequest $req
     * @param array                                              $order_details
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function addOrder($req, $order_details)
    {
        // Order books details
        $order = new Order();
        $order->first_name = $req->first_name;
        $order->last_name = $req->last_name;
        $order->email = $req->email;
        $order->city = $req->city;
        $order->address = $req->address;
        $order->main_phone = $req->main_phone;
        $order->second_phone = $req->second_phone;
        $order->more_info = $req->more_info;
        $order->order_details = json_encode($order_details);
        $order->user_id = $this->user_id();
        $order->save();
        Cart::where('user_id', $this->user_id())->delete();

        return $this->success(msg: 'Order added successfully');
    }

    /**
     * Show client orders.
     *
     * @return ordersCollection
     */
    public function showClientOrders()
    {
        $orders = DB::table('orders')
            ->join('users', 'users.id', 'orders.user_id')
            ->select(
                'orders.id',
                'orders.email as email',
                'orders.first_name as first_name',
                'orders.last_name as last_name',
                'orders.city as city',
                'orders.address as address',
                'orders.main_phone as main_phone',
                'orders.second_phone as second phone',
                'orders.more_info as more_info',
                'orders.status as status',
                'orders.created_at as created_at'
            )
            ->where('orders.user_id', $this->user_id())
            ->paginate($this->paginateCnt);

        // Get order details for user
        $orders_details = [];
        foreach (Order::where('user_id', $this->user_id())->get(['order_details as det', 'id']) as $i) {
            // Add order details to response using BST
            $id = $i->id;
            $i = json_decode($i['det'], true);
            $book_ids = @array_keys($i) or null;
            foreach ($book_ids as $book_id) {
                if ($book_id) {
                    $book_info = Book::where('id', $book_id)->first(['title', 'price', 'img']);
                    $book_info->id = $book_id;
                    $book_info->qty = $i[$book_id];
                    $book_info->img = filter_var($book_info->img, FILTER_VALIDATE_URL) ? $book_info->img : env('FRONTEND_URL', 'http://localhost:3000').("/storage/books/{$book_info->img}");
                    $orders_details[$id][] = $book_info;
                }
            }
        }
        foreach ($orders as $order) {
            if (isset($orders_details[$order->id])) {
                $order->order_details = $orders_details[$order->id];
            }
        }

        return new ordersCollection($orders);
    }

    /** Delete One Order for the client.
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function destroyClientOrder(Order $order)
    {
        if ($order->user_id == $this->user_id()) {
            $order->delete();

            return $this->success(msg: 'Order deleted successfully');
        }

        return $this->success(null, 'No Content', 204);
    }

    /**
     * Delete all orders for the client.
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function deleteAllClientOrders()
    {
        Order::where('user_id', $this->user_id())->delete();

        return $this->success(msg: 'All orders has been deleted successfully');
    }
}
