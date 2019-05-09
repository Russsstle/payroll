<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoleSchedulesTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('role_schedules', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->bigInteger('role_id')->unsigned();
      $table->foreign('role_id')->references('id')->on('roles');
      $table->string('monday')->nullable();
      $table->string('tuesday')->nullable();
      $table->string('wednesday')->nullable();
      $table->string('thursday')->nullable();
      $table->string('friday')->nullable();
      $table->string('saturday')->nullable();
      $table->string('sunday')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('role_schedules');
  }
}
