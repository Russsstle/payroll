<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run() {
    $this->call(RolesTableSeeder::class);
    $this->call(UsersTableSeeder::class);
    $this->call(AttendancesTableSeeder::class);
    $this->call(CompanyTableSeeder::class);
    $this->call(SSSTableSeeder::class);
    $this->call(LeaveTypesTableSeeder::class);
    $this->call(LeavesTableSeeder::class);
  }
}
