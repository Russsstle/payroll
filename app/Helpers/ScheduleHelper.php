<?php

use Carbon\Carbon;

if (!function_exists('defaultSchedule')) {

  /**
   * description
   *
   * @param
   * @return
   */
  function defaultSchedule() {
    return [
      'monday'     => Carbon::createFromTime(8, 0, 0)->format('H:i') . '-' . Carbon::createFromTime(18, 0, 0)->format('H:i'),
      'tuesday'    => Carbon::createFromTime(8, 0, 0)->format('H:i') . '-' . Carbon::createFromTime(18, 0, 0)->format('H:i'),
      'wednesday'  => Carbon::createFromTime(8, 0, 0)->format('H:i') . '-' . Carbon::createFromTime(18, 0, 0)->format('H:i'),
      'thursday'   => Carbon::createFromTime(8, 0, 0)->format('H:i') . '-' . Carbon::createFromTime(18, 0, 0)->format('H:i'),
      'friday'     => Carbon::createFromTime(8, 0, 0)->format('H:i') . '-' . Carbon::createFromTime(17, 0, 0)->format('H:i'),
      'saturday'   => Carbon::createFromTime(8, 0, 0)->format('H:i') . '-' . Carbon::createFromTime(12, 0, 0)->format('H:i'),
      'created_at' => Carbon::create('first day of january this year')
    ];
  }
}
