<?php

namespace App\Http\Controllers\Api\Client\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Account\changeAccountInfoRequest;
use App\Http\Resources\Api\admin\v1\userResource;
use App\Http\Traits\HttpResponse;
use App\Http\Traits\userTrait;
use App\Models\User;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Hash;

class myAccountController extends Controller
{
    use userTrait;
    use HttpResponse;

    /**
     * Show Cilent info.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return $this->success(new userResource($this->get_logged_user_info()), 'Client fetched successfully');
    }

    /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(changeAccountInfoRequest $req)
    {
        // Check If Password is correct
        $user = User::find($this->user_id());
        $user->name = $req->name;
        $user->email = $req->email;
        $pass_updated = false;
        // If Password exists
        if ($req->has('old_password')) {
            // Check if it's matching the existing one
            if (Hash::check($req->input('old_password'), $user->password)) {
                // if so check mathcing of new and repeated pass and update the password
                if ($req->has('new_password') && $req->input('new_password') == $req->input('new_password_confirmation')) {
                    $user->password = Hash::make($req->input('new_password'));
                    $pass_updated = true;
                }
            }
        }
        $user->update();

        return $this->success(['password_updated' => $pass_updated], 'Client Account info udpated successfully');
    }

    /**
     * Remove client account.
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function destroy(HttpRequest $req)
    {
        if ($req->has('password')) {
            $user_info = $this->get_logged_user_info();
            if (Hash::check($req->input('password'), $user_info->password)) {
                auth()->logout();
                User::where('id', $user_info->id)->delete();

                return $this->success(msg: 'Client deleted successfully');
            }

            return $this->validation_errors(['password' => 'password-incorrect']);
        }

        return $this->success(code: 204);
    }
}
