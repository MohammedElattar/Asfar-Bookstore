<?php

namespace App\Http\Traits;

trait storeImage
{
    private function storeImage($request, string $path = null)
    {
        if ($path && $request->hasFile('img')) {
            $imageName = explode('/', $request->file('img')->store($path))[2];

            return $imageName;
        }

        return false;
    }
}
