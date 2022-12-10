<?php

namespace App\Http\Resources\Api\admin\v1;

use Illuminate\Http\Resources\Json\JsonResource;

class settingResource extends JsonResource
{
    private array $contact = ['facebook', 'whatsapp', 'telegram', 'instagram'];

    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $data = [
            'title' => $this->title,
            'logo' => $this->logo ? (env('APP_URL', 'http://localhost:8000')."/storage/setting/{$this->logo}") : null,
            'email' => $this->email,
            'phone' => $this->phone_number,
        ];
        foreach ($this->contact as $i) {
            $data[$i] = $this->{"$i"};
        }

        return $data;
    }
}
