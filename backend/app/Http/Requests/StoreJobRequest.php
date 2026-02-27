<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreJobRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'        => 'required|string|max:255',
            'company'      => 'required|string|max:255',
            'location'     => 'required|string|max:255',
            'category'     => 'required|string|max:100',
            'type'         => 'required|in:Full-time,Part-time,Remote,Contract,Internship',
            'salary'       => 'nullable|string|max:100',
            'description'  => 'required|string',
            'requirements' => 'nullable|string',
            'logo'         => 'nullable|string|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'       => 'Job title is required.',
            'company.required'     => 'Company name is required.',
            'location.required'    => 'Location is required.',
            'category.required'    => 'Category is required.',
            'type.required'        => 'Job type is required.',
            'type.in'              => 'Job type must be one of: Full-time, Part-time, Remote, Contract, Internship.',
            'description.required' => 'Job description is required.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation failed.',
            'errors'  => $validator->errors(),
        ], 422));
    }
}
