<?php

namespace App\Http\Resources\Api\clients\v1\cart;

use Illuminate\Http\Resources\Json\JsonResource;

class cartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'book_name' => $this->book_name,
            'qty' => $this->qty,
            'price' => $this->price,
            'img' => filter_var($this->img, FILTER_VALIDATE_URL) ? $this->img : ($this->img ? env('APP_URL', 'http://localhost:8000/api').("/storage/books/{$this->img}") : null),
        ];
    }
}
