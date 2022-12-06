<?php

namespace App\Http\Controllers\Api\Admin\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class searchController extends Controller
{
    private array $allowed_tables = [];
    // private array $allowed_
    public function index(Request $req , $table = null , $key = null){
        echo $table;
        echo $key;
    }
}
