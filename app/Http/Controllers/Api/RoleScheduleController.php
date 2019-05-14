<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Role;
use App\RoleSchedule;
use App\Schedule;
use Illuminate\Http\Request;
use Yajra\Datatables\Datatables;

class RoleScheduleController extends Controller {
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    $roles = Role::all();
    $data  = [];

    foreach ($roles as $role) {
      $item = new \stdClass;

      $item->id        = $role->schedule->id;
      $item->name      = $role->name;
      $item->monday    = $role->schedule->monday;
      $item->tuesday   = $role->schedule->tuesday;
      $item->wednesday = $role->schedule->wednesday;
      $item->thursday  = $role->schedule->thursday;
      $item->friday    = $role->schedule->friday;
      $item->saturday  = $role->schedule->saturday;

      $data[] = $item;
    }

    if (request()->query('type') == 'table') {
      return Datatables::of($data)->make(true);
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
    $roleSchedule = RoleSchedule::find($id);

    $data = new \stdClass;

    $data->id        = $roleSchedule->id;
    $data->role      = $roleSchedule->role()->first()->name;
    $data->monday    = $roleSchedule->monday_time;
    $data->tuesday   = $roleSchedule->tuesday_time;
    $data->wednesday = $roleSchedule->wednesday_time;
    $data->thursday  = $roleSchedule->thursday_time;
    $data->friday    = $roleSchedule->friday_time;
    $data->saturday  = $roleSchedule->saturday_time;

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
    $roleSchedule = RoleSchedule::find($id);

    $roleSchedule->monday    = $request->monday_from . '-' . $request->monday_to;
    $roleSchedule->tuesday   = $request->tuesday_from . '-' . $request->tuesday_to;
    $roleSchedule->wednesday = $request->wednesday_from . '-' . $request->wednesday_to;
    $roleSchedule->thursday  = $request->thursday_from . '-' . $request->thursday_to;
    $roleSchedule->friday    = $request->friday_from . '-' . $request->friday_to;
    $roleSchedule->saturday  = $request->saturday_from . '-' . $request->saturday_to;

    $roleSchedule->save();
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
