<?php

use App\Attendance;
use App\User;
use Illuminate\Database\Seeder;

class AttendancesTableSeeder extends Seeder {
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {
    $dates = Carbon\CarbonPeriod::create('first day of this month', 'last day of this month')->toArray();

    foreach ($dates as $date) {
      if ($date->dayOfWeek == 'Sunday') {
        continue;
      }

      $date->setTime(0, 0, 0);

      $attendance = new Attendance;
      $attendance->user()->associate(User::find(1));
      $attendance->status     = 'LOGGED_IN';
      $attendance->created_at = $date->addHours(8);
      $attendance->save();

      $attendance = new Attendance;
      $attendance->user()->associate(User::find(1));
      $attendance->status     = 'LOGGED_OUT';
      $attendance->created_at = $date->addHours(10);
      $attendance->save();
    }
  }
}
