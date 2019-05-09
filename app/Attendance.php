<?php

namespace App;

use App\Schedule;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model {
  /**
   * @var array
   */
  protected $fillable = ['status'];

  /**
   * @return mixed
   */
  public function scopeLastStatus($query) {
    $attendance = $query->whereDate('created_at', date('Y-m-d'))->orderBy('id', 'desc')->first();

    return $attendance->status ?? null;
  }

  /**
   * @param $query
   */
  public function scopeComputedMinutes($query, $date = null) {
    $date = $date ?? Carbon::create('now');

    $attendances = $query->whereDate('created_at', $date)->get();

    $totalDuration = 0;

    foreach ($attendances as $attendance) {
      $day      = strtolower($date->format('l'));
      $schedule = Schedule::where('user_id', $query->first()->user_id)->whereDate('created_at', '<=', $attendance->created_at)->latest()->first()->{$day . '_time'};

      if ($attendance->status === 'LOGGED_IN') {
        $startClock = Carbon::create($schedule->from);
        $startTime  = Carbon::create($attendance->created_at->format('H:i:s'));
        $startDate  = $attendance->created_at->lt($startClock) ? $startClock : $startTime;
      } else {
        $endClock = Carbon::create($schedule->to);
        $endTime  = Carbon::create($attendance->created_at->format('H:i:s'));
        $endDate  = $endTime->gt($endClock) ? $endClock : $endTime;
        $totalDuration += $startDate->diffInMinutes($endDate);
      }
    }

    return ceil($totalDuration);
  }

  /**
   * @param $query
   * @param $date
   */
  public function scopeTotalMinutes($query, $date = null) {
    $date = $date ?? Carbon::create('now');

    $attendance = $query->whereDate('created_at', $date)->first();

    if (!$attendance) {
      return 0;
    }

    $totalDuration = 0;

    $day        = strtolower($date->format('l'));
    $schedule   = Schedule::where('user_id', $attendance->user_id)->whereDate('created_at', '<=', $attendance->created_at)->latest()->first()->{$day . '_time'};
    $startClock = Carbon::create($schedule->from);
    $endClock   = Carbon::create($schedule->to);

    $totalDuration += $startClock->diffInMinutes($endClock);

    return ceil($totalDuration);
  }

  /**
   * @return mixed
   */
  public function user() {
    return $this->belongsTo(User::class);
  }
}
