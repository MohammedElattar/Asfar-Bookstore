<?php

namespace App\Http\Requests\Admin\V1\Users;

use App\Http\Traits\HttpResponse;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class updateUsersRequest extends FormRequest
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
        $reg = config('app.ar_en_reg');
        $id = $this->route('user')->id;

        return [
            'name' => "required|regex:$reg|not_regex:/^\d+$/",
            'email' => 'required|email|unique:users,email,'.$id.',id',
            'password' => 'sometimes|required|min:8',
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
