<?php

namespace App\Http\Resources\Api\admin\v1;

use Illuminate\Http\Resources\Json\JsonResource;

class userResource extends JsonResource
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
            'id' => $this->id,
            'email' => $this->email,
            'name' => $this->name,
            'admin' => $this->user_role == '1' ? true : false,
            'avatar' => $this->avatar,
            'active' => $this->active == '1' ? true : false,
        ];
    }
}
