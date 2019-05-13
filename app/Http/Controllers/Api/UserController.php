<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Profile;
use App\Role;
use App\Salary;
use App\Schedule;
use App\SSS;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Yajra\Datatables\Datatables;

class UserController extends Controller {
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    if (request()->query('type') == 'table') {

      $users = User::all();

      $data = [];

      foreach ($users as $user) {
        $item = new \stdClass;

        $item->id         = $user->id;
        $item->avatar     = asset($user->profile->avatar);
        $item->name       = $user->profile->name;
        $item->role_name  = $user->role->name;
        $item->created_at = $user->profile->created_at->format('F d, Y h:i:s A');

        $data[] = $item;
      }

      return Datatables::of($data)->make(true);
    }
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    $request->validate([
      'avatar' => 'nullable|image'
    ]);

    $user = new User;

    $user->role()->associate(Role::find($request->role_id));
    $user->fill($request->only($user->getFillable()));
    $user->uid = $user->generateUid();
    $user->save();

    $profile = new Profile;

    $profile->user()->associate($user);
    $profile->fill($request->only($profile->getFillable()));

    if ($request->hasFile('avatar')) {
      $extension = pathinfo($request->avatar->getClientOriginalName(), PATHINFO_EXTENSION);
      $filename  = Str::random(32) . '.' . $extension;

      $request->avatar->move(public_path('uploads'), $filename);
      $profile->avatar = 'uploads/' . $filename;
    }

    $profile->save();

    return ['success' => true];
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id) {
    $user         = User::find($id);
    $data         = (object) array_merge($user->toArray(), $user->profile->toArray());
    $data->avatar = asset($user->profile->avatar);

    return response()->json($data);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    $request->validate([
      'avatar' => 'nullable|image'
    ]);

    $user = User::find($id);
    $user->role()->associate(Role::find($request->role_id));

    $user->fill($request->only($user->getFillable()));
    $user->save();

    $profile = Profile::where('user_id', $id)->first();

    $profile->user()->associate($user);
    $profile->fill($request->only($profile->getFillable()));

    if ($request->hasFile('avatar')) {
      $extension = pathinfo($request->avatar->getClientOriginalName(), PATHINFO_EXTENSION);
      $filename  = Str::random(32) . '.' . $extension;

      $request->avatar->move(public_path('uploads'), $filename);
      $profile->avatar = 'uploads/' . $filename;
    }

    $profile->save();
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id) {
    //
  }
}
