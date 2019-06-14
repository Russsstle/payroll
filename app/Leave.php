<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Leave extends Model {
  /**
   * @var array
   */
  // protected $dates = ['from', 'to'];

  /**
   * @var array
   */
  protected $fillable = [
    'type', 'note'
  ];
  /**
   * @return mixed
   */
  public function user() {
    return $this->belongsTo(User::class);
  }
  /**
   * @return mixed
   */
  public function leave_type() {
    return $this->belongsTo(LeaveType::class);
  }

  /**
   * @return mixed
   */
  public function leave_date() {
    return $this->hasMany(LeaveDate::class);
  }
}
