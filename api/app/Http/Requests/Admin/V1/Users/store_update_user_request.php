<?php

namespace App\Http\Requests\Admin\V1\Users;

use App\Http\Traits\HttpResponse;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule as ValidationRule;

class store_update_user_request extends FormRequest
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
        $id = $this->route('user');
        $id = $id ? $id->id : null;

        $validations = [
            'name' => "required|regex:$reg|not_regex:/^\d+$/",
            'email' => 'required|email|unique:users,email'.($id ? ",$id,id" : ''),
            'password' => ($id ? 'sometimes|' : '').'required|min:8',
            'admin' => ['required', ValidationRule::in(['true', 'false'])],
        ];

        return $validations;
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
            'admin.required' => 'type-required',
            'admin.boolean' => 'type-invalid',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new \Illuminate\Validation\ValidationException($validator, $this->error('validation errors', 422, ['errors' => $validator->errors()]));
    }
}
