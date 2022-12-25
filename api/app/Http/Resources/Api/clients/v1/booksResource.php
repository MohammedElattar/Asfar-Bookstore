<?php

namespace App\Http\Resources\Api\clients\v1;

use Illuminate\Http\Resources\Json\JsonResource;

class booksResource extends JsonResource
{
    /**
     * Return books resource.
     *
     * @param mixed $request
     *
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'writter' => $this->writter,
            'publisher' => $this->publisher,
            'vendor' => $this->vendor,
            'quantity' => $this->quantity,
            'price' => $this->price,
            'category_id' => $this->category_id,
            'category_name' => $this->category_name,
            'img' => filter_var($this->img, FILTER_VALIDATE_URL) ? $this->img : ($this->img ? env('BOOKS')."/{$this->img}" : null),
        ];
    }
}
