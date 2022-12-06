<?php

namespace App\Http\Controllers\Api\Admin\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\V1\Books\storebook;
use App\Http\Requests\Admin\V1\Books\UpdateBooks;
use App\Http\Resources\Api\admin\v1\booksCollection;
use App\Http\Resources\Api\admin\v1\booksResource;
use App\Http\Traits\HttpResponse;
use App\Models\Api\Admin\V1\Book;

class booksController extends Controller
{
    use HttpResponse;

    /**
     * Display all books.
     *
     * @return booksCollection
     */
    public function index()
    {
        return new booksCollection(Book::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(storebook $request)
    {
        $imageName = $this->storeImage($request);
        $book = Book::create([
            'title' => $request->title,
            'writter' => $request->writter,
            'publisher' => $request->publisher,
            'vendor' => $request->vendor,
            'img' => $imageName ? $imageName : null,
        ]);

        return $this->success([
            new booksResource($book),
        ], 'Book created successfully');
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
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateBooks $request, Book $book)
    {
        if ($request->isMethod('post')) {
            $book->title = $request->title;
            $book->writter = $request->writter;
            $book->publisher = $request->publisher;
            $book->vendor = $request->vendor;
            if ($request->hasFile('img')) {
                if (file_exists('storage/books/'.$book->img)) {
                    unlink('storage/books/'.$book->img);
                    $book->img = $this->storeImage($request);
                }
            }
            $book->save();
            return $this->success(new booksResource($book), 'Book updated successfully');
        } else {
            return $this->error('This route is not found', 404);
        }
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
}
