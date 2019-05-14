<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Leave;
use App\LeaveType;
use App\Profile;
use App\User;
use Illuminate\Http\Request;

class LeaveController extends Controller {
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    $leaves = Leave::all();
    $data   = [];

    foreach ($leaves as $leave) {
      $item             = new \stdClass;
      $item->id         = $leave->id;
      $item->name       = $leave->user->profile->first_name . ' ' . $leave->user->profile->last_name;
      $item->type       = $leave->leave_type->name;
      $item->note       = $leave->note;
      $item->from       = $leave->from->format('F d, Y');
      $item->to         = $leave->to->format('F d, Y');
      $item->created_at = $leave->created_at->format('F d, Y h:i:s A');
      $data[]           = $item;
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
    $leave = new Leave;
    $leave->user()->associate(User::find($request->user_id));
    $leave->leave_type()->associate(LeaveType::find($request->leave_type_id));
    $leave->fill($request->only($leave->getfillable()));

    $leave->save();
    return ['success' => true];
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id) {
    $leave = Leave::find($id);
    // $name  = $leave->user->profile->first_name . ' ' . $leave->user->profile->last_name;
    $item = new \stdClass;

    $item->id            = $leave->id;
    $item->name          = $leave->user->profile->first_name . ' ' . $leave->user->profile->last_name;
    $item->leave_type_id = $leave->leave_type_id;
    $item->note          = $leave->note;
    $item->from          = $leave->from->format('Y-m-d');
    $item->to            = $leave->to->format('Y-m-d');

    return response()->json($item);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    $leave = Leave::find($id);

    $leave->leave_type()->associate(LeaveType::find($request->leave_type_id));
    $leave->fill($request->only($leave->getFillable()));
    $leave->save();

    // $data       = new \stdClass;
    // $data->id   = $leave->id;
    // $data->name = $leave->name;
    // $data->note = $leave->note;
    // $data->from = $leave->from;
    // $data->to   = $leave->to;

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
