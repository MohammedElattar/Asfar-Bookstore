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
            return $this->error('Authentication failed', 401);
        }
        $user = User::where('email', $credentials['email'])->first(['id', 'name', 'email']);
        $exp = new \DateTime('now');
        $exp->add(new \DateInterval('PT604800S'));
        $token = $user->createToken('api token' , ['*'] , $exp)->plainTextToken;
        $cookie = cookie("token" , $token , (60 * 12 * 7));
        return response()->json([
            'data' => $user,
            'token' => $token,
            'expires at' => date('Y-m-d h:i:s', $exp->getTimestamp()),
        ])->withCookie($cookie);
    }
    public function getCookie(Request $req){
        var_dump($req->cookie('testCookie'));
    }
}
