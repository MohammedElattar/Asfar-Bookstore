<?php

namespace App\Models\Api\Client\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client_info extends Model
{
    protected $table = 'client_info';
    protected $fillable = ['first_name' , 'last_name' , 'email' , 'address' , 'city' , 'main_phone' , 'second_phone'];
    use HasFactory;
}
