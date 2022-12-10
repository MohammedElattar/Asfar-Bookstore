<?php

namespace App\Http\Controllers\Api\Admin\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\V1\Users\store_update_user_request;
use App\Http\Resources\Api\admin\v1\usersCollection;
use App\Http\Resources\Api\admin\v1\usersResource;
use App\Http\Traits\HttpResponse;
use App\Models\User;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule as ValidationRule;

class usersController extends Controller
{
    use HttpResponse;

    /**
     * Display a listing of the resource.
     *
     * @return usersCollection
     */
    public function index(HttpRequest $req)
    {
        return new usersCollection(User::paginate($this->paginateCnt($req->input('cnt'))));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(store_update_user_request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_role' => $request->admin == true ? '1' : '0',
            'active' => '1',
        ]);

        return $this->success(new usersResource($user), 'User created successfully');
    }

    /**
     * Display the specified resource.
     *
     * @return usersResource
     */
    public function show(User $user)
    {
        return new usersResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(store_update_user_request $request, User $user)
    {
        $data = $request->all();
        $logout = false;
        if (($this->get_user_id() == $user->id) && ($user->user_role != $request->admin)) {
            $logout = true;
        }
        if ($request->has('password')) {
            $data['password'] = Hash::make($data['password']);
        }
        $user->name = $request->name;
        $user->email = $request->email;
        $user->user_role = $request->admin == 'true' ? '1' : '0';
        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }
        $user->update();
        if ($logout) {
            $this->logout_user();

            return $this->success(['redirect' => true], 'User Administration changed successfully and logged out');
        }

        return $this->success(new usersResource($user), 'Update updated successfully');
    }

    public function changeStatus(HttpRequest $req, User $user)
    {
        $active = $req->validate([
            'active' => ['required', ValidationRule::in(['true', 'false', true, false])],
        ], [
            'active.required' => 'active-required',
            'active',
        ])['active'];
        $id = $this->get_user_id();
        $user->active = $active == 'true' ? '1' : '0';
        $user->update();
        if ($user->id != $id) {
            return $this->success(msg: 'User status Changed successfully');
        } else {
            $this->logout_user();

            return $this->success('User status changed successfully , and the user logged_out');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $id = $this->get_user_id();
        if ($user->id == $id) {
            return $this->error('Same logged user', 422);
        }
        $user->delete();

        return $this->success('User deleted successfully');
    }

    private function paginateCnt(int|null $cnt)
    {
        if ($cnt) {
            if (is_numeric($cnt) && $cnt >= 5 && $cnt <= 50) {
                return $cnt;
            }
        }

        return 10;
    }

    public function delete_all()
    {
        $id = $this->get_user_id();
        DB::delete('DELETE FROM users WHERE id != ?', [$id]);
    }

    private function get_user_id()
    {
        return Auth::user()['id'];
    }

    private function logout_user()
    {
        Auth::guard('web')->logout();
    }
}
