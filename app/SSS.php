<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SSS extends Model {
  /**
   * @var string
   */
  protected $table = 'sss';
  /**
   * @var array
   */
  protected $fillable = [
    'from', 'to', 'employer', 'employee'
  ];
}
