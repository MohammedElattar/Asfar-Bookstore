<?php

namespace Database\Seeders\Api\Admin\V1;

use App\Models\Api\Admin\V1\Book;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class bookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Book::factory(1000)->create();
    }
}
