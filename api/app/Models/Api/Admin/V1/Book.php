<?php

namespace App\Models\Api\Admin\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'img', 'writter', 'publisher', 'vendor', 'quantity', 'price', 'category_id'];

}
