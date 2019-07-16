<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LeaveDate extends Model {
  /**
   * @var array
   */
  protected $dates = ['date'];
  /**
   * @var array
   */
  protected $fillable = ['leave_id', 'date'];
  /**
   * @return mixed
   */
  public function leaves() {
    return $this->belongsTo(Leave::class);
  }
}
