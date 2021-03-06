<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\LeaveType;
use App\Profile;
use Illuminate\Http\Request;
use Yajra\Datatables\Datatables;

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
    $leaveType = new LeaveType;

    $leaveType->fill($request->only($leaveType->getFillable()));
    $leaveType->paid = $request->paid == 'on' ? 1 : 0;

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
    // $leaveType = LeaveType::find($id);

    // $data       = new \stdClass;
    // $data->id   = $leaveType->id;
    // $paid       = $leaveType->paid === false ? 'false' : 'true';
    // $data->name = $leaveType->name;
    // $data->paid = $paid;

    // return $data;
    return LeaveType::find($id);
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
    $leaveType->paid = $request->paid == 'on' ? 1 : 0;

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
    $leaveType = LeaveType::find($id);

    if ($leaveType->delete()) {
      return response()->json(['success' => true]);
    } else {
      return response()->json(['success' => false, 'error' => 'There was an error deleting the record.']);
    }
  }
}
