<?php

namespace Database\Factories\Api\Admin\V1;

use App\Models\Api\Admin\V1\Setting;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Api\Admin\V1\Setting>
 */
class SettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Setting::class;

    public function definition()
    {
        return [
            'title' => fake()->name(),
            'logo' => null,
            'email' => fake()->safeEmail(),
            'phone_number' => fake()->phoneNumber(),
        ];
    }
}
