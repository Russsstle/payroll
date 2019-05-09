<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model {
  /**
   * @var array
   */
  protected $fillable = ['name', 'address', 'contact_number'];

  /**
   * @return mixed
   */
  public function user() {
    return $this->belongsTo(User::class);
  }
}
