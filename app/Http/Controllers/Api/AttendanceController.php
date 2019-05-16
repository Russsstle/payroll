<?php

namespace App\Http\Controllers\Api;

use App\Attendance;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Yajra\Datatables\Datatables;

class AttendanceController extends Controller {
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    if (request()->query('type') == 'table') {
      $attendances = Attendance::all();
      $data        = [];

      foreach ($attendances as $attendance) {
        $item            = new \stdClass;
        $item->id        = $attendance->id;
        $item->name      = $attendance->user->profile->name;
        $item->status    = $attendance->status;
        $item->latitude  = $attendance->latitude;
        $item->longitude = $attendance->longitude;
        $data[]          = $item;
      }

      return Datatables::of($data)->make(true);
    }

    $users = User::all();
    $data  = [];

    foreach ($users as $user) {
      $item         = new \stdClass;
      $item->name   = $user->profile->name;
      $item->status = $user->attendances()->lastStatus();
      $data[]       = $item;
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
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id) {
    $attendance = Attendance::findOrFail($id);

    $data            = new \stdClass;
    $data->name      = $attendance->user->profile->name;
    $data->status    = $attendance->status;
    $data->latitude  = $attendance->latitude;
    $data->longitude = $attendance->longitude;

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
