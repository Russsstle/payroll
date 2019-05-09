<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSssTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('sss', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->decimal('from');
      $table->decimal('to')->nullable();
      $table->decimal('employer');
      $table->decimal('employee');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('sss');
  }
}
