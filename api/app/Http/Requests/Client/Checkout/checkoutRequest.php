<?php

namespace App\Http\Requests\Client\Checkout;

use App\Http\Traits\HttpResponse;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class checkoutRequest extends FormRequest
{
    use HttpResponse;
    // protected $stopOnFirstFailure = true;

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
        // Some regular expressions
        $not_regex = config('regex.not_regex');
        $phone_regex = config('regex.phone_regex');

        return [
            'first_name' => ['required', $not_regex],
            'last_name' => ['sometimes', $not_regex],
            'email' => 'required|email',
            'city' => "required|$not_regex",
            'main_phone' => ['required', $phone_regex],
            'second_phone' => ['sometimes', $phone_regex],
            'address' => 'required',
            'more_info' => 'sometimes',
        ];
    }

    public function messages()
    {
        $ar = [
            'required' => ['first_name', 'email', 'city', 'address', 'main_phone'],
            'not_regex' => ['first_name', 'last_name', 'city'],
            'regex' => ['main_phone', 'second_phone'],
            'email' => ['email'],
        ];

        $res = [];
        foreach ($ar as $i => $j) {
            foreach ($j as $k) {
                if (in_array($i, ['not_regex', 'regex', 'email'])) {
                    $res["$k.$i"] = "$k-not-valid";
                } else {
                    $res["$k.$i"] = "$k-$i";
                }
            }
        }

        return $res;
    }

    protected function failedValidation(Validator $validator)
    {
        throw new \Illuminate\Validation\ValidationException($validator, $this->validation_errors(['errors' => $validator->errors()]));
    }
}
