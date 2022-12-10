<?php

namespace App\Http\Controllers\Api\Admin\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\V1\Settings\updateSettings;
use App\Http\Resources\Api\admin\v1\settingResource;
use App\Http\Traits\HttpResponse;
use App\Models\Api\Admin\V1\Setting;

class settingsController extends Controller
{
    use HttpResponse;

    /**
     * Display a listing of the resource.
     *
     * @return settingResource
     */
    public function index()
    {
        return new settingResource(Setting::find(1));
    }

    /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(updateSettings $request)
    {
        $setting = Setting::find(1);
        $setting->title = $request->title;
        $setting->email = $request->email;
        $setting->phone_number = $request->phone;
        if ($request->has('logo')) {
            if ($setting->logo && file_exists("storage/setting/{$setting->logo}")) {
                unlink("storage/setting/{$setting->logo}");
            }
            $name = $request->file('logo')->store('public/setting');
            $name = explode('/', $name)[2];
            $setting->logo = $name;
        }
        $setting->update();

        return $this->success(new settingResource($setting), 'Setttings updated successfully');
    }
}
