<?php

namespace App\Http\Requests\Admin\V1\Settings;

use App\Http\Traits\HttpResponse;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class updateSettings extends FormRequest
{
    use HttpResponse;
    protected $stopOnFirstFailure = true;

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
    private array $contact = ['facebook', 'whatsapp', 'telegram', 'instagram'];

    public function rules()
    {
        $validation = [
            'title' => 'required|regex:'.config('app.ar_en_reg'),
            'email' => 'required|email',
            'phone' => ['required', 'regex:/^(\d{11}|(([+]{0,1})?(20)\d{10}))$/'],
            'logo' => 'sometimes|bail|required|image|mimes:png,jpeg,jpg|max:3072',
        ];
        foreach ($this->contact as $i) {
            $validation[$i] = 'required|url';
        }

        return $validation;
    }

    public function messages()
    {
        $messages = [
            'title.required' => 'title-required',
            'title.regex' => 'title-invalid',
            'email.required' => 'email-required',
            'email.email' => 'email-invalid',
            'phone.required' => 'phone-required',
            'phone.regex' => 'phone-invalid',
            'logo.image' => 'logo-not-image',
            'logo.mimes' => 'logo-extension',
            'logo.max' => 'logo-big',
        ];
        foreach ($this->contact as $i) {
            $messages["$i.required"] = "$i-required";
            $messages["$i.url"] = "$i-invalid";
        }

        return $messages;
    }

    protected function failedValidation(Validator $validator)
    {
        throw new \Illuminate\Validation\ValidationException($validator, $this->error('validation errors', 422, ['errors' => $validator->errors()]));
    }
}
