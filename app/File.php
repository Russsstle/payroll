<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model {
  /**
   * @var array
   */
  protected $fillable = ['filename'];

  /**
   * @return mixed
   */
  public function attachment() {
    return $this->belongsTo(Attachment::class);
  }
}
