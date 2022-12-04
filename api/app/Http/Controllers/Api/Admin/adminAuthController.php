<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\V1\authAdmin;
use App\Http\Traits\HttpResponse;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\V1\authAdmin as authAdminReqeust;
use Illuminate\Support\Facades\Auth;

class adminAuthController extends Controller
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
        return $this->success([
            "user" => $user,
        ], "User authenticated successfully");
    }
    public function logout(Request $req){
        Auth::guard("web")->logout();
        return $this->success(msg: "User logged out successfully");
    }
}
