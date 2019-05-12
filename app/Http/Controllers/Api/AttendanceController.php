<?php

namespace App\Http\Controllers\Api;

use App\Attendance;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

class AttendanceController extends Controller {
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    $users = User::all();
    $data  = [];
    foreach ($users as $user) {
      $item         = new \stdClass;
      $item->name   = $user->profile->name;
      $item->logged = $user->attendances()->lastStatus() == 'LOGGED_IN';

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
    //
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id) {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    $code = $request->code;

    $user = User::where('uid', $code)->firstOrFail();

    $lastStatus = $user->attendances()->lastStatus();

    $attendance = new Attendance;

    $attendance->user()->associate($user);
    $attendance->status = $lastStatus == 'LOGGED_IN' ? 'LOGGED_OUT' : 'LOGGED_IN';

    $attendance->save();
    return [
      'name'      => $user->profile->name,
      'avatar'    => $user->profile->avatar ? asset('uploads/' . $user->profile->avatar) : null,
      'status'    => $attendance->status,
      'timestamp' => $attendance->created_at
    ];
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
