<?php

namespace App\Http\Controllers\Api\Client\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\clients\v1\booksCollection;
use Illuminate\Support\Facades\DB;

class clientBooks extends Controller
{
    /**
     * Display a listing of all books for clients.
     *
     * @return booksCollection
     */
    public function index()
    {
        $books = DB::table('books')
                    ->join('categories', 'categories.id', '=', 'books.category_id')
                    ->where('categories.status', '1')
                    ->select('books.*', 'categories.name as category_name')
                    ->paginate(20);

        return new booksCollection($books);
    }
}
