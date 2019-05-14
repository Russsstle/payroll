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

Route::get('/auth', 'AuthController@getAuthenticatedUser');
Route::post('/login', 'AuthController@login');
Route::post('/logout', 'AuthController@logout');

Route::prefix('/generate')->group(function () {
  Route::prefix('/pdf')->group(function () {
    Route::get('bir', 'PdfController@generateBIR');
    Route::get('phicER1/{id}', 'PdfController@generateER1');
    Route::get('employerRF1', 'PdfController@generateRF1');
    Route::get('membership_remittance', 'PdfController@generateMembershipRemittance');
    Route::get('phicPMRF/{id}', 'PdfController@generatePMRF');
    Route::get('HDMF/{id}', 'PdfController@generatemMemberContributionRemittance');
    Route::get('sssMLPR', 'PdfController@generateMemberLoanPaymentReturn');
    Route::get('sssCCL', 'PdfController@generateContributionCollectionList');
    Route::get('sssER', 'PdfController@generateEmploymentReport');
    Route::get('sssCP', 'PdfController@generateContributionPayment');
  });
});

Route::get('/{all?}', function () {
  return view('index');
})->where('all', '.*');
