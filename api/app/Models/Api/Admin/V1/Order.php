<?php

namespace App\Models\Api\Admin\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'first_name', 'last_name', 'city', 'address', 'email', 'more_info', 'main_phone', 'second_phone', 'order_details',
    ];
}
