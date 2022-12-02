<?php

namespace App\Http\Controllers\Api\Admin\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\V1\authAdmin;
use App\Http\Traits\HttpResponse;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class authController extends Controller
{
    use HttpResponse;

    public function login(authAdmin $req)
    {
        $credentials = $req->only('email', 'password');
        if (!Auth::attempt($credentials, 1)) {
            return $this->error('Authentication failed', 401 ,null);
        }
        $user = User::where('email', $credentials['email'])->first(['id', 'name', 'email']);
        $exp = new \DateTime('now');
        $exp->add(new \DateInterval('PT604800S'));
        $token = $user->createToken('api token' , ['*'] , $exp)->plainTextToken;
        $cookie = cookie("token" , $token , (60 * 12 * 7));
        return $this->success([
            "user" => $user ,
            "token" => $token ,
            "expires at" => $exp->getTimestamp() ,
        ] , "User authenticated successfully");
    }
}
