<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoleSalariesTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('role_salaries', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->bigInteger('role_id')->unsigned();
      $table->foreign('role_id')->references('id')->on('roles');
      $table->decimal('daily')->default(0);
      $table->decimal('monthly')->default(0);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('role_salaries');
  }
}
