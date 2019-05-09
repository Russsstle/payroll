<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Profile extends Model {
  /**
   * @var array
   */
  protected $dates = ['birthday'];

  /**
   * @var array
   */
  protected $fillable = [
    'avatar',
    'first_name',
    'middle_name',
    'last_name',
    'gender',
    'nationality',
    'pagibig',
    'birthday',
    'civil_status',
    'contact_number',
    'email',
    'address',
    'salary',
    'sss',
    'philhealth',
    'tin'
  ];

  /**
   * @return mixed
   */
  public function getNameAttribute() {
    return $this->first_name . ' ' . $this->last_name;
  }

  /**
   * @return mixed
   */
  public function getMiddleInitialAttribute() {
    return $this->middle_name ? strtoupper(substr($this->middle_name, 0, 1)) . '.' : '';
  }

  public function getFormattedNameAttribute() {
    return Str::title(trim($this->last_name . ', ' . $this->first_name . ' ' . $this->middle_initial));
  }

  /**
   * @return mixed
   */
  public function getFullNameAttribute() {

    $name = collect([$this->first_name, $this->middle_name, $this->last_name])->filter(function ($value) {
      return $value !== '';
    });

    return $name->join(' ');
  }

  /**
   * @return mixed
   */
  public function user() {
    return $this->belongsTo(Profile::class);
  }
}
