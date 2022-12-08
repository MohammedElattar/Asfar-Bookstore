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
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 *  Client Authentication Class.
 */
class authClientController extends Controller
{
    use HttpResponse;
    private array $allowed_providers = ['github', 'google', 'facebook'];

    /**
     * Return all third party links.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $payload = [];
        foreach ($this->allowed_providers as $i) {
            $payload[$i] = route($i.'_redirect');
        }

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
        $user->name = $req->name;
        $user->email = $req->email;
        $user->active = 1;
        $user->password = Hash::make($req->password);
        $user->save();

        return $this->success(msg: 'Client registered successfully');
    }

    /**
     * Login User Using normal credentials.
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
     * Main Login Provider Redirect method.
     *
     * @return mixed
     */
    private function loginProviderRedirect(string $provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Main login Provider Callback method.
     *
     * @return JsonResponse
     */
    private function loginProviderCallback(string $provider)
    {
        try {
            $user = Socialite::driver($provider)->user();
            // check if the email is exists
            $user_exists = User::where('email', $user->email)->first();
            if ($user_exists) {
                auth()->loginUsingId($user_exists->id, true);

                return $this->success(new userResource($user_exists), 'User logged in successfully');
            } else {
                $user = User::create([
                    'email' => $user->getEmail(),
                    'name' => $user->getName(),
                    $provider.'_id' => $user->getId(),
                    'avatar' => $user->getAvatar(),
                ]);

                return $this->success(new userResource($user), 'User logged in successfully');
            }
        } catch (\Exception $e) {
            return $this->error('Failed to login to '.ucfirst($provider), 419, ['msg' => $e->getMessage()]);
        }
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
     * @return JsonResponse
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
     * @return JsonResponse
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
     * @return JsonResponse
     */
    public function loginFacebookCallback()
    {
        return $this->loginProviderCallback('facebook');
    }
}
