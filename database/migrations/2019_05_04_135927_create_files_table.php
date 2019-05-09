<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFilesTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('files', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->bigInteger('attachment_id')->unsigned();
      $table->foreign('attachment_id')->references('id')->on('attachments');
      $table->string('filename');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('files');
  }
}
