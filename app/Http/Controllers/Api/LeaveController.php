<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Leave;
use App\LeaveDate;
use App\LeaveType;
use App\Profile;
use App\User;
use Illuminate\Http\Request;
use Yajra\Datatables\Datatables;

class LeaveController extends Controller {
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    $user   = auth()->user();
    $leaves = $user->role->name == 'Admin' ? Leave::all() : Leave::where('user_id', $user->id)->get();
    $data   = [];

    foreach ($leaves as $leave) {
      $item       = new \stdClass;
      $item->id   = $leave->id;
      $item->name = $leave->user->profile->name;
      $item->type = $leave->leave_type->name;
      $item->note = $leave->note;
      // $item->dates       = ;
      // $item->from       = $leave->from->format('F d, Y');
      // $item->to         = $leave->to->format('F d, Y');
      $item->created_at = $leave->created_at->format('F d, Y h:i:s A');
      $data[]           = $item;
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
    $leave = new Leave;
    $leave->user()->associate(auth()->user()->role->name == 'Admin' ? User::find($request->user_id) : auth()->user());
    $leave->leave_type()->associate(LeaveType::find($request->leave_type_id));
    $leave->fill($request->only($leave->getfillable()));
    $dates = $request->dates;
    $dates = explode(' | ', $dates);

    $leave->save();

    foreach ($dates as $date) {
      $leaveDates = new LeaveDate;
      $leaveDates->fill(['leave_id' => $leave->id, 'date' => date('Y-m-d', strtotime($date))]);
      $leaveDates->save();
    }

    return ['success' => true];
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show(Request $request, $id) {
    if ($request->query('type') == 'personal') {
      $leaves = User::find($id)->leaves->all();

      $data = [];

      foreach ($leaves as $leave) {
        $item = new \stdClass;

        $item->type = $leave->leave_type->name;
        $item->note = $leave->note;

        // $item->from = $leave->from->format('F d, Y');
        // $item->to         = $leave->to->format('F d, Y');
        $item->created_at = $leave->created_at->format('F d, Y h:i:s A');
        $data[]           = $item;
      }

      return $data;
    }

    $leave = Leave::find($id);
    // $name  = $leave->user->profile->first_name . ' ' . $leave->user->profile->last_name;
    $item = new \stdClass;

    $item->id            = $leave->id;
    $item->user_id       = $leave->user_id;
    $item->name          = $leave->user->profile->first_name . ' ' . $leave->user->profile->last_name;
    $item->leave_type_id = $leave->leave_type_id;
    $item->note          = $leave->note;
    // $item->dates         = ;
    // $item->from          = $leave->from->format('Y-m-d');
    // $item->to            = $leave->to->format('Y-m-d');

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
    $leave->user()->associate(User::find($request->user_id));
    $leave->leave_type()->associate(LeaveType::find($request->leave_type_id));

    $leave->fill($request->only($leave->getFillable()));

    $leave->save();
    $dates = $request->dates;
    $dates = explode(' | ', $dates);

    LeaveDate::where('leave_id', $id)->delete();

    foreach ($dates as $date) {
      $leaveDates = new LeaveDate;
      $leaveDates->fill(['leave_id' => $id, 'date' => date('Y-m-d', strtotime($date))]);
      $leaveDates->save();
    }

    // $data       = new \stdClass;
    // $data->id   = $leave->id;
    // $data->name = $leave->name;
    // $data->note = $leave->note;
    // $data->from = $leave->from;
    // $data->to   = $leave->to;

    return ['success' => true, 'dates' => $dates];
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id) {
    $user = Leave::find($id);

    if ($user->delete()) {
      return response()->json(['success' => true]);
    } else {
      return response()->json(['success' => false, 'error' => 'There was an error deleting the record.']);
    }
  }
}
