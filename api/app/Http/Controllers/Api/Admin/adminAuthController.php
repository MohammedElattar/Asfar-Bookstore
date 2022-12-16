<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\V1\authAdmin;
use App\Http\Resources\Api\admin\v1\userResource;
use App\Http\Traits\HttpResponse;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class adminAuthController extends Controller
{
    use HttpResponse;

    public function login(authAdmin $req)
    {
        $user = User::where('email', $req->email)->first(['id', 'email', 'password', 'user_role', 'password', 'name', 'active']);
        if ($user && $user->user_role == '1' && $user->active == '1') {
            if (Hash::check($req->password, $user->password)) {
                Auth::guard('web')->loginUsingId($user->id, true);
                unset($user->password);

                return $this->success([
                    new userResource($user),
                ], 'User authenticated successfully');
            } else {
                return $this->error('Authentication failed', 401, includeData: false);
            }
        }

        return $this->error('Authentication failed', 401, null);
    }

    public function logout()
    {
        Auth::guard('web')->logout();

        return $this->redirect_login(false);
    }
}
