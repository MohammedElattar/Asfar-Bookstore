<?php

namespace App\Http\Controllers\Api\Client\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\clients\v1\cart\cartCollection;
use App\Http\Traits\HttpResponse;
use App\Models\Api\Admin\V1\Book;
use App\Models\Api\Client\V1\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class cartController extends Controller
{
    use HttpResponse;

    /**
     * Display a listing of the resource.
     *
     * @return mixed
     */
    public function index()
    {
        return new cartCollection(DB::table('carts')
                                ->join('users', function ($join) {
                                    $join->on('users.id', 'carts.user_id')
                                        ->where('users.id', 1);
                                })
                                ->join('books', 'books.id', '=', 'carts.book_id')
                                ->select('carts.quantity as qty', 'books.title as book_name', 'books.img as img', 'books.price as price')
                                ->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    private function store(array $data)
    {
        $cart = new Cart();
        $cart->user_id = $this->user_id();
        $cart->book_id = $data['book_id'];
        $cart->quantity = $data['qty'];
        $cart->save();

        return $this->success(['book_id' => $cart->book_id], msg: 'Book inserted into cart');
    }

    /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    private function update(array $data)
    {
        $cnt = 0;
        $book_ids = [];
        foreach ($data as $key => $value) {
            $cartItem = Cart::where('user_id', $this->user_id())->where('book_id', $key)->first();
            if ($cartItem) {
                if ($cartItem->quantity != $value['qty']) {
                    $cartItem->quantity = $value['qty'];
                    $cartItem->update();
                    ++$cnt;
                    $book_ids[] = $key;
                }
            } else {
                return $this->error('Book is not exists in your cart', 422, [$key]);
            }
        }
        if (!$cnt) {
            return $this->success(code: 204);
        }

        return $this->success(["books'ids" => $book_ids], msg: "$cnt book".($cnt > 1 ? 's' : '').' have been updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $req)
    {
        $req = $req->all();
        $cnt = 0;
        $book_ids = [];

        foreach ($req as $book_id) {
            if (is_numeric($book_id)) {
                $cartItem = Cart::where('user_id', $this->user_id())->where('book_id', $book_id)->first('id');
                if ($cartItem) {
                    $cartItem->delete();
                    ++$cnt;
                    $book_ids[] = $book_id;
                }
            }
        }
        if (!$cnt) {
            return $this->success(code: 204);
        }

        return $this->success(["books'ids" => $book_ids], msg: "$cnt ".' book'.($cnt > 1 ? 's' : '').' deleted successfully');
    }

    private function user_id()
    {
        $id = Auth::guard('web')->user();

        return $id->id;
    }

    private function validate_books($data)
    {
        // check if the comming data are bulk or one cart_item
        $errors = [];
        $valid_data = [];
        $keys = array_keys($data);
        foreach ($keys as $key) {
            $ar = $data[$key];
            if (is_numeric($key)) {
                if (isset($errors[$key])) {
                    continue;
                }
                // validate qty
                if (isset($ar['qty'])) {
                    if (is_numeric($ar['qty'])) {
                        if ($ar['qty'] > 0) {
                            $valid_data[$key]['qty'] = $ar['qty'];
                        } else {
                            $errors[$key][] = 'qty-invalid';
                            break;
                        }
                    } else {
                        $errors[$key][] = 'qty-invalid';
                        break;
                    }
                } else {
                    $errors[$key][] = 'qty-required';
                    break;
                }
            }
        }

        if (!$errors) {
            $errors['data'] = $valid_data;
        }

        return $errors;
    }

    public function validate_books_response(Request $request)
    {
        $response = $this->validate_books($request->all());
        $update_book_response = [];
        if (isset($response['data'])) {
            // check some validation in db
            $keys = array_keys($response['data']);
            foreach ($keys as $key) {
                // Check if the category exists and book_id exists also

                $book_info = DB::table('books')
                    ->join('categories', 'categories.id', '=', 'books.category_id')
                    ->select('books.id as id', 'categories.status as status', 'books.quantity as qty', 'books.price as price')
                    ->where('books.id', '=', $key)
                    ->limit(1)
                    ->get();

                // validate fetched data
                // return $book_info;
                if (isset($book_info[0])) {
                    $book_info = $book_info[0];
                    if ($book_info->qty >= $response['data'][$key]['qty']) {
                        // check if the cart_item is already exists
                        $cartItem = Cart::where('book_id', $key)->where('user_id', $this->user_id())->first('book_id');
                        // Handle if Cart Item not exists in the cart
                        if (!$cartItem) {
                            $store_data = $response['data'][$key];
                            $store_data['book_id'] = $key;

                            return $this->store($store_data);
                        } else {
                            // Handle if cart item exists
                            $update_book_response[$key] = $response['data'][$key];
                        }

                    // return $cartItem;
                    } else {
                        $response[$key][] = 'qty-bigger';
                    }
                } else {
                    $response[$key][] = 'book-not-exists';
                }
            }
        } else {
            return $this->error('validation errors', 422, $response);
        }
        unset($response['data']);

        if (!$response && $update_book_response) {
            return $this->update($update_book_response);
        }

        return $this->error('validation errors', 422, $response);
    }
}
