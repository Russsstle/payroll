<?php

namespace App;

use App\Salary;
use App\Schedule;
use App\SSS;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject {
  use SoftDeletes;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'uid', 'username', 'password'
  ];

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [
    'password', 'remember_token'
  ];

  /**
   * Get the identifier that will be stored in the subject claim of the JWT.
   *
   * @return mixed
   */
  public function getJWTIdentifier() {
    return $this->getKey();
  }

  /**
   * Return a key value array, containing any custom claims to be added to the JWT.
   *
   * @return array
   */
  public function getJWTCustomClaims() {
    return [];
  }

  public static function boot() {
    parent::boot();

    self::created(function ($model) {
      $salary = new Salary;
      $salary->user()->associate($model);
      $salary->fill(defaultSalary());
      $salary->save();

      $schedule = new Schedule;
      $schedule->user()->associate($model);
      $schedule->fill(defaultSchedule());
      $schedule->save();
    });
  }

  /**
   * @param $password
   */
  protected function setPasswordAttribute($password) {
    $this->attributes['password'] = bcrypt($password);
  }

  /**
   * @param $query
   * @param $date
   * @return mixed
   */
  public function computedDailySalary($date = null) {
    $initial = $this->attendances()->computedMinutes($date);
    $total   = $this->attendances()->totalMinutes($date);

    $salary = $this->salary->daily;

    return $total == 0 ? 0 : $salary * $initial / $total;
  }

  /**
   * @param $date
   */
  public function computedMonthlySalary($month = null) {
    $month = strtolower($month ?? date('F'));
    $dates = \Carbon\CarbonPeriod::create("first day of {$month} this year", "last day of {$month} this year")->toArray();

    $initial = 0;
    $total   = 0;

    foreach ($dates as $date) {
      if ($date->format('l') != 'Sunday') {
        $initial += $this->attendances()->computedMinutes($date);
        $total += $this->attendances()->totalMinutes($date);
      }
    }

    $salary = $this->salary->monthly;

    return $total == 0 ? 0 : $salary * $initial / $total;
  }

  /**
   * @param $total
   */
  public function getDeductions($total) {
    $sss = SSS::where('from', '<=', $total)->where('to', '>=', $total)->first();

    return (object) [
      'sss'        => (float) ($this->type == 'employer' ? $sss->employer : $sss->employee),
      'pagibig'    => $total * ($this->type == 'employer' ? ($total <= 1500 ? 0.02 : 0.02) : ($total <= 1500 ? 0.01 : 0.02)),
      'philhealth' => $total * 0.0275 / 2
    ];
  }

  /**
   * @param $password
   */
  public static function generateUid() {
    do {
      $string = Str::random(16);
    } while (User::where('uid', $string)->count() > 0);

    return $string;
  }

  /**
   * @return mixed
   */
  public function getTypeAttribute() {
    return $this->company()->first() ? 'employer' : 'employee';
  }

  /**
   * @return mixed
   */
  public function role() {
    return $this->belongsTo(Role::class);
  }

  /**
   * @return mixed
   */
  public function profile() {
    return $this->hasOne(Profile::class);
  }
  /**
   * @return mixed
   */
  public function leaves() {
    return $this->hasMany(Leave::class);
  }

  /**
   * @return mixed
   */
  public function attendances() {
    return $this->hasMany(Attendance::class);
  }

  /**
   * @return mixed
   */
  public function salary() {
    return $this->hasOne(Salary::class);
  }

  /**
   * @return mixed
   */
  public function company() {
    return $this->hasOne(Company::class);
  }
}
