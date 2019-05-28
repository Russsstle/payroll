<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::apiResources([
  'users'          => 'UserController',
  'attendances'    => 'AttendanceController',
  'dashboard'      => 'DashboardController',
  'salaries'       => 'SalaryController',
  'attachments'    => 'AttachmentController',
  'leaves'         => 'LeaveController',
  'leave_types'    => 'LeaveTypeController',
  'schedules'      => 'ScheduleController',
  'roles'          => 'RoleController',
  'role_schedules' => 'RoleScheduleController',
  'role_salaries'  => 'RoleSalaryController',
  'bir'            => 'PdfController'
]);