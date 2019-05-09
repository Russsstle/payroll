<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Profile;
use App\Salary;
use App\Schedule;
use App\SSS;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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
        $item->avatar     = $user->profile->avatar ? asset('uploads/' . $user->profile->avatar) : null;
        $item->name       = $user->profile->name;
        $item->role_name  = $user->role->name;
        $item->created_at = $user->profile->created_at->format('F d, Y h:i:s A');

        $data[] = $item;
      }

      return $data;
    }

    $users = User::all();

    $data = [];

    foreach ($users as $user) {
      $item = new \stdClass;

      $item->id         = $user->id;
      $item->uid        = $user->uid;
      $item->role_name  = $user->role->name;
      $item->avatar     = $user->profile->avatar ? asset('uploads/' . $user->profile->avatar) : null;
      $item->name       = $user->profile->name;
      $item->created_at = $user->profile->created_at->format('F d, Y h:i:s A');

      $data[] = $item;
    }

    return $data;
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

      $profile->avatar = Str::random(32) . '.' . $extension;
      $request->avatar->move(public_path('uploads'), $profile->avatar);
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
    $user = User::find($id);

    $item = new \stdClass;

    $item->id         = $user->id;
    $item->uid        = $user->uid;
    $item->role_name  = $user->role->name;
    $item->avatar     = $user->profile->avatar ? asset('uploads/' . $user->profile->avatar) : null;
    $item->name       = $user->profile->name;
    $item->created_at = $user->profile->created_at->format('F d, Y h:i:s A');

    return $item;
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

      $profile->avatar = Str::random(32) . '.' . $extension;
      $request->avatar->move(public_path('uploads'), $profile->avatar);
    }

    $profile->save();

    // $data             = new \stdClass;
    // $data->id         = $user->id;
    // $data->username   = $user->username;
    // $data->first_name = $user->profile->first_name;
    // $data->last_name  = $user->profile->last_name;
    // $data->avatar     = asset('uploads/' . $user->profile->avatar);

    return ['success' => true];
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
