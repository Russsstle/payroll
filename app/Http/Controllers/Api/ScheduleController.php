<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\RoleSchedule;
use App\Schedule;
use App\User;
use Illuminate\Http\Request;
use Yajra\Datatables\Datatables;

class ScheduleController extends Controller {
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    $schedule = new Schedule;
    $schedule->user()->associate(User::find($request->user_id));

    $schedule->monday    = $request->monday_from . '-' . $request->monday_to;
    $schedule->tuesday   = $request->tuesday_from . '-' . $request->tuesday_to;
    $schedule->wednesday = $request->wednesday_from . '-' . $request->wednesday_to;
    $schedule->thursday  = $request->thursday_from . '-' . $request->thursday_to;
    $schedule->friday    = $request->friday_from . '-' . $request->friday_to;
    $schedule->saturday  = $request->saturday_from . '-' . $request->saturday_to;

    $schedule->save();
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id) {
    $schedule = Schedule::where('user_id', $id)->latest()->first();

    $data = new \stdClass;

    $data->id        = $schedule->id;
    $data->monday    = $schedule->monday_time;
    $data->tuesday   = $schedule->tuesday_time;
    $data->wednesday = $schedule->wednesday_time;
    $data->thursday  = $schedule->thursday_time;
    $data->friday    = $schedule->friday_time;
    $data->saturday  = $schedule->saturday_time;

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
    //
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
