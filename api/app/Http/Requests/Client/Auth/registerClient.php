<?php

namespace App\Http\Requests\Client\Auth;

use App\Http\Traits\HttpResponse;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class registerClient extends FormRequest
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
            'name' => 'required|regex:'.config('app.ar_en_reg')."|not_regex:/^\d+$/",
            'email' => 'bail|required|email|unique:users,email',
            'password' => 'required|min:8',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'name-required',
            'name.regex' => 'name-invalid',
            'name.not_regex' => 'name-only-numbers',
            'email.required' => 'email-required',
            'email.email' => 'email-invalid',
            'email.unique' => 'email-exists',
            'password.required' => 'password-required',
            'password.min' => 'password-short',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new \Illuminate\Validation\ValidationException($validator, $this->error('validation errors', 422, ['errors' => $validator->errors()]));
    }
}
