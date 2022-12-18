<?php

namespace App\Http\Controllers\Api\Client\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\clients\v1\cart\cartCollection;
use App\Http\Traits\HttpResponse;
use App\Http\Traits\userTrait;
use App\Models\Api\Client\V1\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class cartController extends Controller
{
    use HttpResponse;
    use userTrait;

    /**
     * Fetch all cart items of authenticated user.
     *
     * @return cartCollection
     */
    public function index()
    {
        return new cartCollection(DB::table('carts')
                                ->join('users', function ($join) {
                                    $join->on('users.id', 'carts.user_id')
                                        ->where('users.id', 1);
                                })
                                ->join('books', 'books.id', '=', 'carts.book_id')
                                ->select('carts.quantity as qty', 'books.title as book_name', 'books.img as img', 'books.price as price', 'books.vendor as vendor')
                                ->get());
    }

    /**
     * Store a new cart item of authenticated user.
     *
     *  @param array ($data)
     *
     *  @return \Illuminate\Http\JsonResponse
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
     * Update existing cart item of authenticated user.
     *
     * @param array ($data)
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
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
     * Delete one or more cart items of authenticated user.
     *
     * @param Request ($req)
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
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

    private function validate_books($data)
    {
        // check if the comming data are bulk or one cart_item
        $errors = [];
        $valid_data = [];
        $keys = array_keys($data);
        foreach ($keys as $key) {
            $ar = $data[$key];
            if (is_numeric($key)) {
                // prevent existing key's errors
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
                if (isset($book_info[0])) {
                    $book_info = is_object($book_info[0]) ? $book_info[0] : (object) [$book_info[0]];
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
            return $this->validation_errors($response);
            // echo "Data is not here";
        }
        unset($response['data']);

        if (!$response && $update_book_response) {
            return $this->update($update_book_response);
        }

        return $this->validation_errors($response);
    }
}
