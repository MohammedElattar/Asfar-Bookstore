<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Database\Seeders\Api\Admin\V1\bookSeeder;
use Database\Seeders\Api\Admin\V1\categorySeeder;
use Database\Seeders\Api\Admin\V1\settingsSeeder;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'password' => Hash::make('admin'), // password
            'user_role' => '1',
            'active' => '1',
            'avatar' => null,
            'remember_token' => Str::random(10),
        ]);

        \App\Models\User::factory()->create([
            'name' => 'user',
            'email' => 'user@user.com',
            'email_verified_at' => now(),
            'password' => Hash::make('user'), // password
            'user_role' => '0',
            'active' => '1',
            'avatar' => null,
            'remember_token' => Str::random(10),
        ]);
        $this->call([
            settingsSeeder::class,
            // userSeeder::class,
            categorySeeder::class,
            bookSeeder::class,
        ]);
    }
}
