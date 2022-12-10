<?php

namespace App\Http\Controllers\Api\Admin\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\V1\Books\books as bookRequest;
use App\Http\Resources\Api\admin\v1\booksCategoriesCollection;
use App\Http\Resources\Api\admin\v1\booksCollection;
use App\Http\Resources\Api\admin\v1\booksResource;
use App\Http\Traits\HttpResponse;
use App\Models\Api\Admin\V1\Book;
use App\Models\Api\Admin\V1\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class booksController extends Controller
{
    use HttpResponse;

    /**
     * Display all books.
     *
     * @return booksCollection
     */
    public function index(Request $req)
    {
        $cnt = 10;
        if ($req->has('cnt')) {
            $t = $req->input('cnt');
            if (is_numeric($t) && $t > 5 && $t <= 50) {
                $cnt = $t;
            }
        }

        return new booksCollection(Book::paginate($cnt));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(bookRequest $request)
    {
        $cat = Category::where('id', $request->category)->where('status', '1')->first('id');
        if (isset($cat->id)) {
            $imageName = $this->storeImage($request);
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
     * Display the specified resource.
     *
     * @return booksResource
     */
    public function show(Book $book)
    {
        return new booksResource($book);
    }

    /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(bookRequest $request, Book $book)
    {
        if ($request->isMethod('post')) {
            $cat = Category::where('id', $request->category)->where('status', '1')->first('id');
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
                    $book->img = $this->storeImage($request);
                }
                $book->update();

                return $this->success(new booksResource($book), 'Book updated successfully');
            }
        } else {
            return $this->error('This route is not found', 404);
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

    private function storeImage($request, string $path = 'public/books')
    {
        if ($request->hasFile('img')) {
            $imageName = explode('/', $request->file('img')->store($path))[2];

            return $imageName;
        }

        return false;
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
