<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Role;
use App\RoleSalary;
use App\Salary;
use Illuminate\Http\Request;
use Yajra\Datatables\Datatables;

class RoleSalaryController extends Controller {
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

      $item->id      = $role->id;
      $item->name    = $role->name;
      $item->daily   = $role->salary->daily;
      $item->monthly = $role->salary->monthly;

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
    $roleSalary = RoleSalary::find($id);

    $data = new \stdClass;

    $data->id      = $roleSalary->id;
    $data->role    = $roleSalary->role()->first()->name;
    $data->daily   = $roleSalary->daily;
    $data->monthly = $roleSalary->monthly;

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
    $roleSalary = RoleSalary::find($id);

    $roleSalary->fill($request->only($roleSalary->getFillable()));

    $roleSalary->save();

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
