<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LeaveType extends Model {
  /**
   * @var array
   */
  protected $fillable = ['name', 'paid'];

  /**
   * @var array
   */
  protected $casts = [
    'paid' => 'boolean'
  ];
  /**
   * @return mixed
   */
  public function leaves() {
    return $this->hasMany(Leave::class);
  }
}
