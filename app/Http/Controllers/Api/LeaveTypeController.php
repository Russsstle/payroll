<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\LeaveType;
use App\Profile;
use Illuminate\Http\Request;

class LeaveTypeController extends Controller {
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    $leaves = LeaveType::all();
    $data   = [];

    foreach ($leaves as $leave) {
      $item             = new \stdClass;
      $item->id         = $leave->id;
      $item->name       = $leave->name;
      $item->paid       = $leave->paid ? 'Paid' : 'Unpaid';
      $item->created_at = $leave->created_at->format('F d, Y');

      $data[] = $item;
    }

    return ['data' => $data];
    return $data;
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    $leaveType = new LeaveType;

    $leaveType->fill($request->only($leaveType->getFillable()));
    $leaveType->paid = $request->paid == 'on';

    $leaveType->save();
    return ['success' => true];
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id) {
    $leaveType = LeaveType::find($id);

    $data = new \stdClass;

    $paid       = $leaveType->paid === false ? 'false' : 'true';
    $data->id   = $leaveType->id;
    $data->name = $leaveType->name;
    $data->paid = $paid;

    return $data;
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    $leaveType = LeaveType::find($id);

    $leaveType->fill($request->only($leaveType->getFillable()));
    $leaveType->paid = $request->paid == 'on';

    $leaveType->save();

    // $data       = new \stdClass;
    // $data->id   = $leaveType->id;
    // $data->type = $leaveType->type;
    // $data->paid = $leaveType->paid;

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
