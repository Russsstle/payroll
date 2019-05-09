<?php

namespace App;

use App\Role;
use App\Schedule;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class RoleSchedule extends Model {
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

  public static function boot() {
    parent::boot();

    self::created(function ($model) {
      self::addScheduleToUser($model);
    });
    self::updated(function ($model) {
      self::addScheduleToUser($model);
    });
  }

  /**
   * @param $model
   */
  public static function addScheduleToUser($model) {
    $role = $model->role;

    if (!$role) {
      return;
    }

    foreach ($role->users->all() as $user) {
      $schedule = new Schedule;
      $schedule->user()->associate($user);
      $schedule->monday    = $model->monday;
      $schedule->tuesday   = $model->tuesday;
      $schedule->wednesday = $model->wednesday;
      $schedule->thursday  = $model->thursday;
      $schedule->friday    = $model->friday;
      $schedule->saturday  = $model->saturday;
      $schedule->sunday    = $model->sunday;
      $schedule->save();
    }
  }

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
  public function role() {
    return $this->belongsTo(Role::class);
  }
}
