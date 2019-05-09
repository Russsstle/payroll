<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Salary;
use App\User;
use Illuminate\Http\Request;

class SalaryController extends Controller {
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    $users = User::all();
    $data  = [];
    foreach ($users as $user) {
      $item           = new \stdClass;
      $item->id       = $user->id;
      $item->username = $user->username;
      $item->name     = $user->profile->name;
      $item->salary   = $user->salary->daily;
      $data[]         = $item;
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
    $salary = new Salary;
    $salary->user()->associate(User::find($request->user_id));
    $salary->fill($request->only($salary->getFillable()));
    $salary->save();

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

    $data = new \stdClass;

    $data->id       = $user->salary_rate->id;
    $data->username = $user->username;
    $data->name     = $user->profile->name;
    $data->salary   = $user->salary_rate->salary;

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
    $salaryRates         = SalaryRate::find($id);
    $salaryRates->salary = $request->salary;

    $salaryRates->save();

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
