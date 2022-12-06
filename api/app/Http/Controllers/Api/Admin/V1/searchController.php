<?php

namespace App\Http\Controllers\Api\Admin\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\admin\v1\booksCollection;
use App\Http\Resources\Api\admin\v1\booksResource;
use App\Http\Traits\HttpResponse;
use App\Models\Api\Admin\V1\Book;
use App\Models\Api\Admin\V1\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class searchController extends Controller
{
    use HttpResponse;
    private array $allowed_tables = ['books' => 'books', 'categories' => 'categories'];
    private array $allowed_columns = [
        'books' => ['title', 'writter', 'publisher', 'vendor', 'quantity', 'price'],
        'categories' => ['name'],
    ];

    /**
     *
     * @param Request $req
     * @param string|null $table
     * @param mixed|null $value
     * @return JsonResponse
     */
    public function index(Request $req , string $table = null, mixed $value = null)
    {
        $table = trim(htmlspecialchars($table));
        $value = trim(htmlspecialchars($value));
        if(isset($this->allowed_tables[$table])){
            // store the table
            $t = $this->allowed_tables[$table];

            // prepare the where caluse
            $where_query = "";
            foreach($this->allowed_columns[$t] as $column){
                if(!$where_query)$where_query.=" WHERE $column LIKE '%$value%'";
                else {
                    $where_query.=" OR $column LIKE '%$value%'";
                }
            }
            $rows = [];
            $cnt = 10;
            if($req->has("cnt")){
                $tmp = $req->input("cnt");
                if(is_numeric($tmp) && $tmp >= 5 && $tmp<=50){
                    $cnt = $tmp;
                }
            }
            $rows = $t == 'books' ? $this->books($value, $cnt) : ($t == 'categories' ? $this->categories($value, $cnt) : []);
            return $rows;
        } else
            return $this->error("Not found", 404);
    }
    /**
     * Return all matched books
     * @param mixed $value
     * @param int $cnt
     * @return mixed
     */
    private function books(mixed $value , $cnt){
        return Book::where("title" , 'like' , "%$value%")
                                        ->orWhere("writter" , "like" , "%$value%")
                                        ->orWhere("publisher" , "like" , "%$value%")
                                        ->orWhere("vendor" , "like" , "%$value%")
                                        ->orWhere("quantity" , "like" , "%$value%")
                                        ->orWhere("price" , "like" , "%$value%")->paginate($cnt);
    }
    /**
     * Return all matched categories
     * @param mixed $value
     * @param int $cnt
     * @return mixed
     */
    private function categories(mixed $value , int $cnt){
        return Category::where("name", 'like', "%$value%")->paginate($cnt);
    }
}
