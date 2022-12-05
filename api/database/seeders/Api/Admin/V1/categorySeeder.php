<?php

namespace Database\Seeders\Api\Admin\V1;

use App\Models\Api\Admin\V1\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class categorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::factory(100000)->create();
    }
}
