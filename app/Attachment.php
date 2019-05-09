<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attachment extends Model {
  /**
   * @var array
   */
  protected $fillable = ['name', 'type'];

  /**
   * @return mixed
   */
  public function user() {
    return $this->belongsTo(User::class);
  }

  /**
   * @return mixed
   */
  public function files() {
    return $this->hasMany(File::class);
  }
}
