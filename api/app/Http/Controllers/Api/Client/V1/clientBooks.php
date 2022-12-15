<?php

namespace App\Http\Controllers\Api\Client\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\clients\v1\booksCollection;
use App\Http\Resources\Api\clients\v1\booksResource;
use App\Http\Traits\HttpResponse;
use App\Models\Api\Admin\V1\Book;
use Illuminate\Support\Facades\DB;

/**
 * Clients Books Manager which control everything about books in public website.
 */
class clientBooks extends Controller
{
    use HttpResponse;

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

    /**
     *  Show one book in public website.
     *
     *@param Book ($book)
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse|booksResource
     */
    public function show(Book $book)
    {
        // Check if book's category is enabled if so , return it's data
        $book = DB::table('books')
                    ->join('categories', 'categories.id', 'books.category_id')
                    ->select('books.*', 'categories.name as category_name', 'categories.status as status')
                    ->where('categories.status', '1')
                    ->where('categories.id', $book->category_id)
                    ->limit(1)
                    ->first();
        if ($book && $book->status == '1') {
            return new booksResource($book);
        }
        // if not , return not found response
        return $this->not_found();
    }
}
