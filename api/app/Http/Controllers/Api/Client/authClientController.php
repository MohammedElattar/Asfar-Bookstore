<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Auth\loginClient;
use App\Http\Requests\Client\Auth\registerClient;
use App\Http\Resources\Api\admin\v1\userResource;
use App\Http\Traits\HttpResponse;
use App\Http\Traits\thirdPartyAuthentication;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 *  Client Authentication Class.
 */
class authClientController extends Controller
{
    use HttpResponse;
    use thirdPartyAuthentication;

    /**
     * Return all third party links.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $payload = $this->getAllThirdPartyLinks();

        return $this->success($payload, 'Redirect URI fetched successfully');
    }

    /**
     *  Register a new user.
     *
     * @return JsonResponse
     */
    public function register(registerClient $req)
    {
        $user = new User();
        $user = $this->create_user([
            'name' => $req->name,
            'email' => $req->email,
            'active' => 1,
            'password' => Hash::make($req->password),
        ]);

        return $this->success(new userResource($user), msg: 'Client registered successfully');
    }

    /**
     * Authenticate client.
     *
     * @param loginClient ($req)
     *
     * @return JsonResponse
     */
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

    /**
     *  Github Redirect Method.
     *
     * @return mixed
     */
    public function loginGithubRedirect()
    {
        return $this->loginProviderRedirect('github');
    }

    /**
     *  Github Callback function.
     *
     * @return mixed
     */
    public function loginGithubCallback()
    {
        return $this->loginProviderCallback('github');
    }

    /**
     *  Google Redirect method.
     *
     * @return mixed
     */
    public function loginGoogleRedirect()
    {
        return $this->loginProviderRedirect('google');
    }

    /**
     *  Google Callback.
     *
     * @return mixed
     */
    public function loginGoogleCallback()
    {
        return $this->loginProviderCallback('google');
    }

    /**
     *  Facebook Redirect Method.
     *
     * @return mixed
     */
    public function loginFacebookRedirect()
    {
        return $this->loginProviderRedirect('facebook');
    }

    /**
     * Facebook Callback Function.
     *
     * @return mixed
     */
    public function loginFacebookCallback()
    {
        return $this->loginProviderCallback('facebook');
    }
}
