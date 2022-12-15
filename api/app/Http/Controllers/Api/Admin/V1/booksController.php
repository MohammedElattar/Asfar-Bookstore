<?php

namespace App\Http\Controllers\Api\Admin\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\V1\Books\books as bookRequest;
use App\Http\Resources\Api\admin\v1\booksCategoriesCollection;
use App\Http\Resources\Api\admin\v1\booksCollection;
use App\Http\Resources\Api\admin\v1\booksResource;
use App\Http\Traits\HttpResponse;
use App\Http\Traits\storeImage;
use App\Models\Api\Admin\V1\Book;
use App\Models\Api\Admin\V1\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class booksController extends Controller
{
    use HttpResponse;
    use storeImage;

    /**
     * Display all books.
     *
     * @param Request ($req)
     *
     * @return booksCollection
     */
    public function index(Request $req)
    {
        // count if books in one pagination page
        $cnt = 10;
        if ($req->has('cnt')) {
            $t = $req->input('cnt');
            if (is_numeric($t) && $t > 5 && $t <= 50) {
                $cnt = $t;
            }
        }
        // Fetch all books with enabled category
        $books = DB::table('books')
                    ->join('categories', 'categories.id', '=', 'books.category_id')
                    ->select('books.*', 'categories.status as status')
                    ->where('status', '1')
                    ->paginate($cnt);

        return new booksCollection($books);
    }

    /**
     * Store a new book.
     *
     * @param bookRequest ($request)
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse|booksResource
     */
    public function store(bookRequest $request)
    {
        $cat = categoriesController::get_category_status($request->category);
        if (isset($cat->id)) {
            $imageName = $this->storeImage($request, 'public/books');
            $book = Book::create([
                'title' => $request->title,
                'writter' => $request->writter,
                'category_id' => $request->category,
                'publisher' => $request->publisher,
                'vendor' => $request->vendor,
                'quantity' => $request->quantity,
                'price' => $request->price,
                'img' => $imageName ? $imageName : null,
            ]);

            return $this->success([
                new booksResource($book),
            ], 'Book created successfully');
        }

        return $this->error('Category is not found', 422);
    }

    /**
     * Fetch one book.
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse|booksResource
     */
    public function show(Book $book)
    {
        if (categoriesController::get_category_status($book->category_id)) {
            return new booksResource($book);
        }

        return $this->not_found();
    }

    /**
     * Update book.
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function update(bookRequest $request, Book $book)
    {
        if ($request->isMethod('post')) {
            $cat = categoriesController::get_category_status($book->category_id);
            if (isset($cat->id)) {
                $book->title = $request->title;
                $book->writter = $request->writter;
                $book->category_id = $request->category;
                $book->publisher = $request->publisher;
                $book->vendor = $request->vendor;
                $book->quantity = $request->quantity;
                $book->price = $request->price;
                if ($request->hasFile('img') && $request->file('img')) {
                    if ($book->img && file_exists('storage/books/'.$book->img)) {
                        unlink('storage/books/'.$book->img);
                    }
                    $book->img = $this->storeImage($request, 'public/books');
                }
                $book->update();

                return $this->success(new booksResource($book), 'Book updated successfully');
            }
        } else {
            return $this->not_found();
        }

        return $this->error('Categrory is not found', 422);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Book $book)
    {
        if ($book->img && file_exists("storage/books/{$book->img}")) {
            unlink("storage/books/{$book->img}");
        }
        $book->delete();

        return $this->success(msg: 'Book deleted successfully');
    }

    public function delete_all()
    {
        DB::delete('DELETE FROM books');

        return $this->success(msg: 'All books deleted successfully');
    }

    public function categories()
    {
        return new booksCategoriesCollection(Category::where('status', '1')->get());
    }
}
