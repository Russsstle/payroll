<?php

use App\Company;
use App\User;
use Illuminate\Database\Seeder;

class CompanyTableSeeder extends Seeder {
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {
    $company = new Company;
    $company->user()->associate(User::find(1));

    $company->name           = 'Sample Inc.';
    $company->address        = 'Address 101';
    $company->contact_number = '12345';

    $company->save();
  }
}
