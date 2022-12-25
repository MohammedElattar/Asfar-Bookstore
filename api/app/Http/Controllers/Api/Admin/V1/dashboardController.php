<?php

namespace App\Http\Controllers\Api\Admin\V1;

use App\Http\Controllers\Controller;
use App\Models\Api\Admin\V1\Book;
use App\Models\Api\Admin\V1\Category;
use App\Models\Api\Admin\V1\Order;
use App\Models\User;
use Illuminate\Http\Request;

class dashboardController extends Controller
{
    public function index(){
        $orders = Order::all(['status']);
        $a = $p = 0;
        foreach($orders as $order){
            if ($order->status)
                $a++;
            else
                $p++;
        }
        return [
            "categories" => Category::all()->count(),
            "books" => Book::all()->count(),
            'users' => User::all()->count(),
            'orders' => $a+$p,
            'pending-orders' => $p,
            'approved-orders' => $a,
        ];
    }
}
