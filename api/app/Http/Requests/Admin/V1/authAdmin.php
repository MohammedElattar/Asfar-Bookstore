<?php

namespace App\Http\Requests\Admin\V1;

use App\Http\Traits\HttpResponse;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class authAdmin extends FormRequest
{
    use HttpResponse;
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "email"  => "bail|required|email" ,
            "password" => "bail|required"
        ];
    }
    public function messages()
    {
        return [
            "email.required" => "Email cannot be empty" ,
            "email.email"    => "You must type a valid Email" ,
            "password.required" => "Password cannot be empty"
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        throw new \Illuminate\Validation\ValidationException($validator , $this->error("validation errors" , 422 , [
            "errors" => $validator->errors()
        ]));
    }
}
