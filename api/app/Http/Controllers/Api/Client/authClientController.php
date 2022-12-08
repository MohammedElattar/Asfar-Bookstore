<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Auth\loginClient;
use App\Http\Requests\Client\Auth\registerClient;
use App\Http\Resources\Api\admin\v1\userResource;
use App\Http\Traits\HttpResponse;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class authClientController extends Controller
{
    use HttpResponse;

    public function index()
    {
        return 'This is index register';
    }

    public function googleRegister()
    {
    }

    public function register(registerClient $req)
    {
        $user = new User();
        $user->name = $req->name;
        $user->email = $req->email;
        $user->active = 1;
        $user->password = Hash::make($req->password);
        $user->save();

        return $this->success(msg: 'Client registered successfully');
    }

    public function login(loginClient $req)
    {
        $credentials = $req->only('email', 'password');
        $user = User::where('email', $credentials['email'])->first();
        if ($user) {
            if (Hash::check($credentials['password'], $user->password) && $user->user_role == '0') {
                Auth::loginUsingId($user->id, true);

                return $this->success(new userResource($user), 'Client logged in successfully');
            } else {
                return $this->error('Not authorized', 401);
            }
        }

        return $this->error('Not authorized', 401);
    }
}
