<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'type'=>$this->type,
            'phone'=>$this->phone,
            'address'=>$this->address,
            'user_id'=>$this->user_id,
            'created_at'=>$this->created_at->format('Y-m-d'),
        ];

    }
}
