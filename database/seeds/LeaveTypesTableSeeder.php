<?php

use App\LeaveType;
use Illuminate\Database\Seeder;

class LeaveTypesTableSeeder extends Seeder {
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {
    $leaveType = new LeaveType;

    $leaveType->name       = 'Paternity Leave';
    $leaveType->paid       = true;
    $leaveType->created_at = '2019-05-06';
    $leaveType->save();

    $leaveType             = new LeaveType;
    $leaveType->name       = 'Maternity Leave';
    $leaveType->paid       = true;
    $leaveType->created_at = '2019-05-06';
    $leaveType->save();

    $leaveType             = new LeaveType;
    $leaveType->name       = 'Sick Leave';
    $leaveType->paid       = false;
    $leaveType->created_at = '2019-05-06';
    $leaveType->save();

  }
}
