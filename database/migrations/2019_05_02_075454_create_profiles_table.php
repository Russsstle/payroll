<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfilesTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('profiles', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->bigInteger('user_id')->unsigned();
      $table->foreign('user_id')->references('id')->on('users');
      $table->string('avatar')->nullable();
      $table->string('first_name');
      $table->string('middle_name')->nullable();
      $table->string('last_name');
      $table->string('gender')->nullable();
      $table->date('birthday')->nullable();
      $table->string('birth_place')->nullable();
      $table->string('nationality')->nullable();
      $table->string('civil_status')->nullable();
      $table->string('mobile_number')->nullable();
      $table->string('telephone_number')->nullable();
      $table->string('email')->nullable();
      $table->string('address')->nullable();
      $table->string('pagibig')->nullable();
      $table->string('sss')->nullable();
      $table->string('philhealth')->nullable();
      $table->string('tin')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('profiles');
  }
}
