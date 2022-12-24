<?php

namespace App\Http\Resources\Api\admin\v1;

use Illuminate\Http\Resources\Json\JsonResource;

class ordersResource extends JsonResource
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
        $ar = [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'city' => $this->city,
            'address' => $this->address,
            'more_info' => $this->more_info,
            'approved' => $this->status,
            'created_at' => date('Y-m-d H:i:s', strtotime($this->created_at)),        ];
        if (isset($this->user_id)) {
            $ar['client_id'] = $this->user_id;
            $ar['client_name'] = $this->client_name;
        }
        $ar['details'] = $this->details;

        return $ar;
    }
}
