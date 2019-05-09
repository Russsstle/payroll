<?php

namespace App;

use App\Salary;
use Illuminate\Database\Eloquent\Model;

class RoleSalary extends Model {
  /**
   * @var array
   */
  protected $fillable = ['daily', 'monthly'];

  public static function boot() {
    parent::boot();

    self::created(function ($model) {
      self::addSalaryToUser($model);
    });
    self::updated(function ($model) {
      self::addSalaryToUser($model);
    });
  }

  /**
   * @param $model
   */
  public static function addSalaryToUser($model) {
    $role = $model->role;

    if (!$role) {
      return;
    }

    foreach ($role->users->all() as $user) {
      $salary = new Salary;
      $salary->user()->associate($user);
      $salary->daily   = $model->daily;
      $salary->monthly = $model->monthly;
      $salary->save();
    }
  }

  /**
   * @return mixed
   */
  public function role() {
    return $this->belongsTo(Role::class);
  }
}
