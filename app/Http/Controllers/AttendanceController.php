<?php

namespace App\Http\Controllers;

use App\Attendance;
use App\User;
use Illuminate\Http\Request;

class AttendanceController extends Controller {
  /**
   * @param Request $request
   */
  public function barcode(Request $request) {
    $code = $request->code;

    $user = User::where('uid', $code)->firstOrFail();

    $lastStatus = $user->attendances()->lastStatus();

    $attendance = new Attendance;

    $attendance->user()->associate($user);
    $attendance->status = $lastStatus == 'LOGGED_IN' ? 'LOGGED_OUT' : 'LOGGED_IN';

    $attendance->save();

    return [
      'name'      => $user->profile->name,
      'avatar'    => asset($user->profile->avatar),
      'status'    => $attendance->status,
      'timestamp' => $attendance->created_at
    ];
  }

  /**
   * @param Request $request
   */
  public function manual(Request $request) {
    $id = $request->id;

    $user = User::where('id', $id)->firstOrFail();

    $lastStatus = $user->attendances()->lastStatus();

    $attendance = new Attendance;

    $attendance->user()->associate($user);
    $attendance->status    = $lastStatus == 'LOGGED_IN' ? 'LOGGED_OUT' : 'LOGGED_IN';
    $attendance->latitude  = $request->latitude;
    $attendance->longitude = $request->longitude;

    $attendance->save();
    return [
      'name'      => $user->profile->name,
      'avatar'    => asset($user->profile->avatar),
      'status'    => $attendance->status,
      'timestamp' => $attendance->created_at
    ];
  }
}
