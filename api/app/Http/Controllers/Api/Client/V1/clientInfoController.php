<?php

namespace App\Http\Controllers\Api\Client\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Checkout\checkoutRequest;
use App\Http\Traits\HttpResponse;
use App\Http\Traits\userTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class clientInfoController extends Controller
{
    use HttpResponse;
    use userTrait;
    private $table = 'client_info';

    public function index(Request $req)
    {
        $user_info = $this->get_logged_user_info();
        if ($user_info->user_role == '0' && $user_info->active == '1') {
            // Fetch Client information if exists
            $client_info = DB::selectOne("SELECT * FROM {$this->table} WHERE client_id =?", [$user_info->id]);
            if ($client_info) {
                unset($client_info->created_at);
                unset($client_info->updated_at);

                return $this->success($client_info, 'Client Info Fetched successfully');
            }
        }

        return $this->success(code: 204);
    }

    /**
     * Add client info or update it.
     *
     * @param Request $req
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function createOrUpdateClientInfo(checkoutRequest $req)
    {
        $user_info = $this->get_logged_user_info();
        // return $user_info;
        if ($user_info->user_role == '0' && $user_info->active == '1') {
            // Check if client id is already exists
            $client_id = DB::table($this->table)->where('client_id', $user_info->id)->first('client_id');
            DB::table($this->table)->where('client_id', $user_info->id)->updateOrInsert([
                'client_id' => $user_info->id,
                'first_name' => $req->first_name,
                'last_name' => $req->last_name,
                'email' => $req->email,
                'city' => $req->city,
                'address' => $req->address,
                'main_phone' => $req->main_phone,
                'second_phone' => $req->second_phone,
            ]);

            return $this->success(msg: 'Client info has been '.($client_id ? 'updated' : 'added').' successfully');
        }

        return $this->success(msg: 'not data found');
    }
}
