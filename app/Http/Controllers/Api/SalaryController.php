<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Salary;
use App\User;
use Carbon;
use Illuminate\Http\Request;

class SalaryController extends Controller {
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request) {
    $users = User::all();
    $data  = [];

    foreach ($users as $user) {
      $item = new \stdClass;

      $total      = $user->computedMonthlySalary($request->filter);
      $deductions = $user->getDeductions($total);

      if ($total > 0) {
        $item->name        = $user->profile->name;
        $item->sss         = $deductions->sss;
        $item->pagibig     = $deductions->pagibig;
        $item->philhealth  = $deductions->philhealth;
        $item->gross_total = $total;
        $item->net_total   = $total - array_reduce((array) $deductions, function ($total, $value) {
          return $total + $value;
        }, 0);

        $data[] = $item;
      }
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
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show(Request $request, $id) {
    if ($request->query('type') == 'payslip') {
      $user   = User::find($id);
      $filter = $request->query('filter');

      if ($filter == 'year') {
        $dates = Carbon\CarbonPeriod::create('first day of january this year', 'last day of december this year')->toArray();
      } else if ($filter == 'month') {
        $dates = Carbon\CarbonPeriod::create('first day of this month', 'last day of this month')->toArray();
      } else {
        $dates = Carbon\CarbonPeriod::create($user->created_at, 'now')->toArray();
      }

      $months = [];
      $data   = [];

      $i = -1;
      foreach ($dates as $date) {
        $i++;
        if ($date->format('l') == 'Sunday') {
          continue;
        }

        $item = new \stdClass;

        $item->date    = $date->format('F d, Y');
        $item->minutes = $user->attendances()->computedMinutes($date);
        $item->salary  = $user->computedDailySalary($date);

        if ($item->minutes > 0) {
          $data[] = $item;
        }

        if ($i == count($dates) - 1 || $date->format('m') != $dates[$i + 1]->format('m')) {
          $total = array_reduce($data, function ($total, $value) {
            return $total + $value->salary;
          }, 0);

          if ($total > 0) {
            $months[] = array_merge([
              'dateyear' => $date->format('F Y'),
              'data'     => $data,
              'total'    => $total
            ], (array) $user->getDeductions($total));
          }

          $data = [];
        }
      }

      return $months;
    }

    $salary = Salary::where('user_id', $id)->latest()->first();

    $data = new \stdClass;

    $data->daily   = $salary->daily;
    $data->monthly = $salary->monthly;

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
