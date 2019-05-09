<?php

namespace App;

use App\RoleSalary;
use App\RoleSchedule;
use Illuminate\Database\Eloquent\Model;

class Role extends Model {
  /**
   * @var array
   */
  protected $fillable = ['name'];

  public static function boot() {
    parent::boot();

    self::created(function ($model) {
      $roleSchedule = new RoleSchedule;
      $roleSchedule->role()->associate($model);
      $roleSchedule->fill(defaultSchedule());
      $roleSchedule->save();

      $roleSalary = new RoleSalary;
      $roleSalary->role()->associate($model);
      $roleSalary->fill(defaultSalary());
      $roleSalary->save();
    });
  }

  /**
   * @return mixed
   */
  public function users() {
    return $this->hasMany(User::class);
  }

  /**
   * @return mixed
   */
  public function schedule() {
    return $this->hasOne(RoleSchedule::class);
  }

  /**
   * @return mixed
   */
  public function salary() {
    return $this->hasOne(RoleSalary::class);
  }
}
