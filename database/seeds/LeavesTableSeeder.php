<?php

use App\Leave;
use App\LeaveType;
use App\User;
use Illuminate\Database\Seeder;

class LeavesTableSeeder extends Seeder {
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {

    $leave = new Leave;

    $leave->user()->associate(User::find(1));
    $leave->leave_type()->associate(LeaveType::find(1));
    $leave->note = 'The main reason';
    // $leave->from = '2019-05-05';
    // $leave->to   = '2019-05-06';

    $leave->save();
  }
}
