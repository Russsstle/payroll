<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Leave extends Model {
  /**
   * @var array
   */
  protected $dates = ['from', 'to'];

  /**
   * @var array
   */
  protected $fillable = [
    'type', 'note', 'from', 'to'
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

}
