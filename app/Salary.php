<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Salary extends Model {
  /**
   * @var array
   */
  protected $fillable = ['daily', 'monthly'];

  /**
   * @return mixed
   */
  public function user() {
    return $this->belongsTo(User::class);
  }
}
