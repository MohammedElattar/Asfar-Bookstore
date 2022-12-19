<?php

namespace App\Http\Traits;

use App\Http\Resources\Api\admin\v1\userResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

trait userTrait
{
    public function user_id()
    {
        return Auth::guard('web')->user()->id;
        // return 1;
    }

    /**
     * Create a new user in database.
     *
     * @param array ($user_info)
     *
     * @return object
     */
    public function create_user(array $user_info)
    {
        return User::create($user_info);
    }

    public function get_logged_user_info()
    {
        return new userResource(Auth::guard('web')->user());
    }
}
