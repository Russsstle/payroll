<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttendancesTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('attendances', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->bigInteger('user_id')->unsigned();
      $table->foreign('user_id')->references('id')->on('users');
      $table->enum('status', ['LOGGED_IN', 'LOGGED_OUT']);
      $table->decimal('latitude', 10, 8)->nullable();
      $table->decimal('longitude', 11, 8)->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('attendances');
  }
}
