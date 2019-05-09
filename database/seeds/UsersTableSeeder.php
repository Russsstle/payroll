<?php

use App\Profile;
use App\Role;
use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder {
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {
    $user = new User;

    $user->uid = $user->generateUid();
    $user->role()->associate(Role::where('name', 'Admin')->first());
    $user->username = 'spcl';
    $user->password = 'spcl';
    $user->save();

    $profile = new Profile;

    $profile->user()->associate($user);
    $profile->first_name       = 'StellaPolaris';
    $profile->middle_name      = '';
    $profile->last_name        = 'IT';
    $profile->gender           = 'Male';
    $profile->nationality      = 'Filipino';
    $profile->birthday         = '2019-05-01';
    $profile->civil_status     = 'Single';
    $profile->mobile_number    = '1231231123';
    $profile->telephone_number = '242-5074';
    $profile->email            = 'info@stellapolaris.ph';
    $profile->address          = 'Manila City';
    $profile->sss              = '2234124125723';
    $profile->pagibig          = '5248344125723';
    $profile->philhealth       = '1232221232238';
    $profile->tin              = '1234567891234';
    $profile->save();

    $faker = Faker\Factory::create();
    $faker = new Faker\Generator();
    $faker->addProvider(new Faker\Provider\en_US\Person($faker));
    $faker->addProvider(new Faker\Provider\DateTime($faker));
    $faker->addProvider(new Faker\Provider\en_US\PhoneNumber($faker));
    $faker->addProvider(new Faker\Provider\Internet($faker));

    for ($i = 0; $i < 100; $i++) {
      $user = new User;

      $user->uid = $user->generateUid();
      $user->role()->associate(Role::where('name', 'User')->first());

      do {
        $user->username = strtolower($faker->lastName . rand(11, 99));
      } while (User::where('username', $user->username)->first());

      $user->password = '1234';
      $user->save();

      $profile = new Profile;

      $profile->user()->associate($user);
      $profile->first_name       = $faker->firstName;
      $profile->middle_name      = '';
      $profile->last_name        = $faker->lastName;
      $profile->gender           = 'Male';
      $profile->nationality      = 'Filipino';
      $profile->birthday         = $faker->date($format = 'Y-m-d', $max = '-20 years');
      $profile->civil_status     = 'Single';
      $profile->mobile_number    = '09' . str_pad(rand(1, 999999999), 9, '0', STR_PAD_LEFT);
      $profile->telephone_number = $faker->tollFreePhoneNumber();
      $profile->email            = $faker->email();
      $profile->address          = 'Manila City';
      $profile->sss              = str_pad(rand(1, 9999999999999), 13, '0', STR_PAD_LEFT);
      $profile->pagibig          = str_pad(rand(1, 9999999999999), 13, '0', STR_PAD_LEFT);
      $profile->philhealth       = str_pad(rand(1, 9999999999999), 13, '0', STR_PAD_LEFT);
      $profile->tin              = str_pad(rand(1, 9999999999999), 13, '0', STR_PAD_LEFT);
      $profile->save();
    }

    // $user = new User;

    // $user->uid = $user->generateUid();
    // $user->role()->associate(Role::where('name', 'User')->first());
    // $user->username = 'neonspectrum';
    // $user->password = '1234';
    // $user->save();

    // $profile = new Profile;

    // $profile->user()->associate($user);
    // $profile->first_name       = 'Manny Alejandro';
    // $profile->middle_name      = 'Andrecio';
    // $profile->last_name        = 'Young';
    // $profile->gender           = 'Male';
    // $profile->nationality      = 'Filipino';
    // $profile->birthday         = '1999-01-04';
    // $profile->civil_status     = 'Single';
    // $profile->mobile_number    = '09772373397';
    // $profile->telephone_number = '242-5074';
    // $profile->email            = 'youngskymann@gmail.com';
    // $profile->address          = 'Manila City';
    // $profile->sss              = '2234124125723';
    // $profile->pagibig          = '5248344125723';
    // $profile->philhealth       = '1232221232238';
    // $profile->tin              = '1234567891234';
    // $profile->save();

    // $user = new User;

    // $user->uid = $user->generateUid();
    // $user->role()->associate(Role::where('name', 'User')->first());
    // $user->username = 'russell';
    // $user->password = '1234';
    // $user->save();

    // $profile = new Profile;

    // $profile->user()->associate($user);
    // $profile->first_name       = 'Russell John';
    // $profile->middle_name      = 'Bacal';
    // $profile->last_name        = 'Santos';
    // $profile->nationality      = 'Filipino';
    // $profile->gender           = 'Male';
    // $profile->birthday         = '1998-11-19';
    // $profile->civil_status     = 'Single';
    // $profile->mobile_number    = '09194512311';
    // $profile->telephone_number = '709-1945';
    // $profile->email            = 'rjohn.saints@gmail.com';
    // $profile->address          = 'Quezon City';
    // $profile->pagibig          = '5248344125723';
    // $profile->sss              = '2234124125723';
    // $profile->philhealth       = '1232221232238';
    // $profile->tin              = '1234567891234';
    // $profile->save();
  }
}
