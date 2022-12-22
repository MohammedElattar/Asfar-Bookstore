<?php

namespace App\Http\Requests\Client\Account;

use App\Http\Traits\HttpResponse;
use App\Http\Traits\userTrait;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class changeAccountInfoRequest extends FormRequest
{
    use HttpResponse;
    use userTrait;

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
            'name' => 'required|regex:'.config('regex.ar_en_reg').'|'.config('regex.not_regex'),
            'email' => "bail|required|email|unique:users,email,{$this->user_id()},id",
            'old_password' => 'sometimes',
            'new_password' => 'sometimes|confirmed|min:8',
        ];
    }

    /**
     * Messages.
     *
     * @return array<string>
     */
    public function messages()
    {
        $ar = [
            'name' => ['required', 'regex', 'not_regex'],
            'email' => ['required', 'email', 'unique'],
            'new_password' => ['min', 'confirmed'],
        ];
        $special = [
            'required' => 'required',
            'not_regex' => 'not-valid',
            'regex' => 'not-valid',
            'email' => 'not-valid',
            'min' => 'short',
            'confirmed' => 'not-match',
            'unique' => 'exists',
        ];
        $res = [];
        foreach ($ar as $key => $values) {
            foreach ($values as $val) {
                $res["$key.$val"] = "$key-$special[$val]";
            }
        }

        return $res;
    }

    protected function failedValidation(Validator $validator)
    {
        throw new \Illuminate\Validation\ValidationException($validator, $this->error('validation errors', 422, ['errors' => $validator->errors()]));
    }
}
