<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLeaveDatesTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('leave_dates', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->bigInteger('leave_id')->unsigned();
      $table->foreign('leave_id')->references('id')->on('leaves');
      $table->date('date');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('leave_dates');
  }
}
