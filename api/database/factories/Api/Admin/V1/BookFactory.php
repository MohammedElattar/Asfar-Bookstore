<?php

namespace Database\Factories\Api\Admin\V1;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Api\Admin\V1\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "title" => "testTitle" ,
            "writter" => "testwritter" ,
            "publisher" => "test publisher",
            "vendor" => "testvendor" ,
            "quantity" => fake()->numberBetween(1,300),
            "price" => fake()->randomFloat(null , 1,6000),
            "img" => null
        ];
    }
}
