<?php

namespace App\Http\Traits;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

trait userTrait
{
    public function user_id()
    {
        $id = Auth::guard('web')->user();

        return $id->id;
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
}
