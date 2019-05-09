<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model {
  /**
   * @var array
   */
  protected $fillable = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ];

  /**
   * @param $date
   */
  public function getAttribute($key) {
    $days = [
      'monday_time',
      'tuesday_time',
      'wednesday_time',
      'thursday_time',
      'friday_time',
      'saturday_time',
      'sunday_time'
    ];

    if (in_array($key, $days)) {
      $time = explode('-', $this->getOriginal(str_replace('_time', '', $key)));

      $item = new \stdClass;

      $item->from = Carbon::createFromTimeString($time[0])->format('H:i');
      $item->to   = Carbon::createFromTimeString($time[1])->format('H:i');

      return $item;
    }

    return $this->getOriginal($key);
  }

  /**
   * @return mixed
   */
  public function user() {
    return $this->belongsTo(User::class);
  }
}
