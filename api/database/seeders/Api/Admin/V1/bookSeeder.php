<?php

namespace Database\Seeders\Api\Admin\V1;

use App\Models\Api\Admin\V1\Book;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class bookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Book::factory(1000)->create();
        $books = json_decode(file_get_contents(__DIR__.'/../../../../../../json/products.json'));
        foreach ($books as $i) {
            DB::table('books')->insert([
                'title' => isset($i->title) ? $i->title : fake()->name(),
                'writter' => isset($i->writter) ? $i->writter : fake()->name(),
                'publisher' => isset($i->publisher) ? $i->publisher : fake()->name(),
                'vendor' => isset($i->vendor) ? $i->vendor : fake()->name(),
                'img' => isset($i->img) ? $i->img : null,
                'price' => fake()->randomFloat(2, 1, 5000).'',
                'quantity' => fake()->numberBetween(1, 1000).'',
                'category_id' => fake()->numberBetween(1, 100).'',
                'created_at' => now(),
            ]);
        }
    }
}
