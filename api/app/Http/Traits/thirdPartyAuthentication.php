<?php

namespace App\Http\Traits;

use App\Http\Resources\Api\admin\v1\userResource;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;

trait thirdPartyAuthentication
{
    use userTrait;
    private array $allowed_providers = ['github', 'google', 'facebook'];

    /**
     * Return all third party links.
     *
     * @return array<string>
     */
    public function getAllThirdPartyLinks()
    {
        $payload = [];
        foreach ($this->allowed_providers as $i) {
            $payload[$i] = route($i.'_redirect');
        }

        return $payload;
    }

    /**
     * Redirect user to provider oauth page.
     *
     * @param string ($provider)
     *
     * @return mixed
     */
    public function loginProviderRedirect(string $provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    private function loginProviderCallback(string $provider)
    {
        try {
            $user = Socialite::driver($provider)->user();
            // check if the email is exists
            $user_exists = User::where('email', $user->email)->first();
            if ($user_exists) {
                auth()->loginUsingId($user_exists->id, true);

            // return $this->success(new userResource($user_exists), 'User logged in successfully');
            } else {
                $user = $this->create_user([
                    'email' => $user->getEmail(),
                    'name' => $user->getName(),
                    $provider.'_id' => $user->getId(),
                    'avatar' => $user->getAvatar(),
                ]);

                return $this->success(new userResource($user), 'User logged in successfully');
            }
        } catch (\Exception $e) {
            return $this->error('Failed to login to '.ucfirst($provider), 419, ['msg' => $e->getMessage() ? $e->getMessage() : 'Invalid Credentials']);
        }
    }
}
