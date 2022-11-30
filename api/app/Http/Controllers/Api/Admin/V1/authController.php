<?php

namespace App\Http\Controllers\Api\Admin\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\V1\authAdmin;
use App\Http\Traits\HttpResponse;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class authController extends Controller
{
    use HttpResponse;
    public function login(authAdmin $req)
    {
        $credentials = $req->only("email" , 'password');
        if(!Auth::attempt($credentials , 1)){
            return $this->error("Authentication failed" , 401);
        }
        $user = User::where("email" , $credentials['email'])->first(['id' , 'name' , 'email']);
        return $this->success([
            "data" => $user ,
            "token" => $user->createToken($user->name)->plainTextToken
        ] , "User authenticated successfully");
    }
}
