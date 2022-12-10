<?php

namespace Database\Seeders\Api\Admin\V1;

use App\Models\Api\Admin\V1\Setting;
use Illuminate\Database\Seeder;

class settingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Setting::factory(1)->create();
    }
}
