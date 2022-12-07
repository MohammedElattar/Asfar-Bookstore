<?php

namespace App\Http\Traits;

use App\Models\User;
use Laravel\Sanctum\Sanctum;

trait testing
{
    public function write_file(string $directory_name, string $file_name, string $content)
    {
        $directory_name = __DIR__."/../../../tests/res/$directory_name";
        if (!is_dir($directory_name)) {
            mkdir($directory_name , recursive:true);
        }
        $full_path = "$directory_name/$file_name.json";
        $handle = fopen("$full_path.json", 'w');
        fwrite($handle, $content);
        fclose($handle);
    }

    public function authSanctum()
    {
        $user = User::find(1);
        Sanctum::actingAs($user);
    }
}
