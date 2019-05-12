<?php

use Carbon\Carbon;

if (!function_exists('defaultSalary')) {

  /**
   * description
   *
   * @param
   * @return
   */
  function defaultSalary() {
    return [
      'daily'      => 500,
      'monthly'    => 10000,
      'created_at' => Carbon::create('first day of january this year')
    ];
  }
}
