<?php

namespace App\Http\Controllers\Api\Admin\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\admin\v1\booksCollection;
use App\Http\Resources\Api\admin\v1\usersCollection;
use App\Http\Traits\HttpResponse;
use App\Models\Api\Admin\V1\Book;
use App\Models\Api\Admin\V1\Category;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class searchController extends Controller
{
    use HttpResponse;
    private array $allowed_tables = ['books' => 'books', 'categories' => 'categories', 'users' => 'users'];
    private array $allowed_columns = [
        'books' => ['title', 'writter', 'publisher', 'vendor', 'quantity', 'price'],
        'categories' => ['name'],
        'users' => [
            'id',
            'email',
            'name',
        ],
    ];

    /**
     * @return booksCollection|usersCollection|jsonResponse
     */
    public function index(Request $req, string $table = null, mixed $value = null, $cnt = 10)
    {
        $table = trim(htmlspecialchars($table));
        $value = trim(htmlspecialchars($value));
        if (isset($this->allowed_tables[$table])) {
            // store the table
            $t = $this->allowed_tables[$table];

            // prepare the where caluse
            $where_query = '';
            foreach ($this->allowed_columns[$t] as $column) {
                if (!$where_query) {
                    $where_query .= " WHERE $column LIKE '%$value%'";
                } else {
                    $where_query .= " OR $column LIKE '%$value%'";
                }
            }
            $rows = [];
            if ($req->has('cnt')) {
                $tmp = $req->input('cnt');
                if (is_numeric($tmp) && $tmp >= 5 && $tmp <= 50) {
                    $cnt = $tmp;
                }
            }
            $rows = $t == 'books' ? $this->books($value, $cnt) : ($t == 'categories' ? $this->categories($value, $cnt) : ($t == 'users' ? $this->users($value, $cnt) : []));
            if ($t == 'books') {
                return new booksCollection($rows);
            } elseif ($t == 'users') {
                return new usersCollection($rows);
            }
        } else {
            return $this->error('Not found', 404);
        }
    }

    /**
     * Return all matched books.
     *
     * @param int $cnt
     *
     * @return mixed
     */
    private function books(mixed $value, $cnt)
    {
        return Book::where('title', 'like', "%$value%")
                                        ->orWhere('writter', 'like', "%$value%")
                                        ->orWhere('publisher', 'like', "%$value%")
                                        ->orWhere('vendor', 'like', "%$value%")
                                        ->orWhere('quantity', 'like', "%$value%")
                                        ->orWhere('price', 'like', "%$value%")->paginate($cnt);
    }

    /**
     * Return all matched categories.
     *
     * @return mixed
     */
    private function categories(mixed $value, int $cnt)
    {
        return Category::where('name', 'like', "%$value%")->paginate($cnt);
    }

    private function users(mixed $value, int $cnt)
    {
        return User::where('name', 'like', "%$value%")
            ->orWhere('id', 'like', "%$value%")
            ->orWhere('email', 'like', "%$value%")->paginate($cnt);
    }
}
