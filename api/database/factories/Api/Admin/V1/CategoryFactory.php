<?php

namespace Database\Factories\Api\Admin\V1;

use App\Models\Api\Admin\V1\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Api\Admin\V1\Category>
 */
class CategoryFactory extends Factory
{
    protected $model = Category::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "name" => fake()->name() , "status" => fake()->numberBetween(0,1).""
        ];
    }
}
