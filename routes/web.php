<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::group([
  'domain' => 'attendance.{all}',
  'where'  => [
    'all' => '.*'
  ]
], function () {
  Route::post('/barcode', 'AttendanceController@barcode');
  Route::post('/manual', 'AttendanceController@manual');

  Route::get('/{all?}', function () {
    return view('index', ['title' => 'Attendance System', 'js' => 'attendance']);
  })->where('all', '.*');
});

Route::get('/auth', 'AuthController@getAuthenticatedUser');
Route::prefix('/generate')->group(function () {
  Route::post('bir', 'Api\BIRController@generate');
  Route::post('erf', 'Api\ERFController@generate');
  Route::post('mrf', 'Api\MRFController@generate');
});
Route::post('/login', 'AuthController@login');
Route::post('/logout', 'AuthController@logout');

// Route::prefix('/generate')->group(function () {
//   Route::prefix('/pdf')->group(function () {
//     Route::get('bir', 'PdfController@generateBIR');
//     Route::get('phicER1/{id}', 'PdfController@generateER1');
//     Route::get('employerRF1', 'PdfController@generateRF1');
//     Route::get('membership_remittance', 'PdfController@generateMembershipRemittance');
//     Route::get('phicPMRF/{id}', 'PdfController@generatePMRF');
//     Route::get('sssMLPR', 'PdfController@generateMemberLoanPaymentReturn');
//     Route::get('sssCCL', 'PdfController@generateContributionCollectionList');
//     Route::get('sssER', 'PdfController@generateEmploymentReport');
//     Route::get('sssCP', 'PdfController@generateContributionPayment');
//   });
// });

Route::get('/{all?}', function () {
  return view('index', ['title' => 'Payroll System', 'js' => 'admin']);
})->where('all', '.*');
