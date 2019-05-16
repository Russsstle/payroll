<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Role;
use App\User;
use Illuminate\Http\Request;
use setasign\Fpdi\Fpdi;

class MRFController extends Controller {
  /**
   * @param Request $request
   */
  public function generate(Request $request) {
    $users = User::whereIN('id', $request->employee)->get();

    $pdf = new Fpdi;
    $pdf->SetFont('Arial');
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetFontSize('8');

    for ($i = 0, $y = 66; $i < count($users); $i++) {
      $user = $users[$i];

      if ($i % 40 == 0) {
        $pdf->AddPage();
        $pdf->setSourceFile(public_path('pdf/pagibig.pdf'));
        $pdf->useTemplate($pdf->importPage(1), null, null, null, null, true);
        $y = 66;
      }

      $employer = Role::where('name', 'Admin')->first()->users()->first();

      $employerSalary       = $employer->computedMonthlySalary();
      $employerContribution = $employer->getDeductions($employerSalary);

      $salary       = $user->computedMonthlySalary();
      $contribution = $user->getDeductions($salary);

      $pdf->SetXY(8, $y);
      $pdf->Write(0, $user->profile->tin);
      $pdf->SetXY(31.6, $y);
      $pdf->SetFontSize('7');
      $pdf->Write(0, $user->profile->birthday ? $user->profile->birthday->format('F d, Y') : '');
      $pdf->SetFontSize('8');
      $pdf->SetXY(63, $y);
      $pdf->Write(0, $user->profile->last_name);
      $pdf->SetXY(92, $y);
      $pdf->Write(0, $user->profile->first_name);
      $pdf->SetXY(121, $y);
      $pdf->Write(0, $user->profile->middle_name);
      $pdf->SetXY(140, $y);
      $pdf->Write(0, number_format($contribution->pagibig, 2, '.', ','));
      $pdf->SetXY(163, $y);
      $pdf->Write(0, number_format($employerContribution->pagibig, 2, '.', ','));
      $pdf->SetXY(186, $y);
      $pdf->Write(0, number_format($employerContribution->pagibig + $contribution->pagibig, 2, '.', ','));
      $y += 4.319;
    }

    $headers = ['Content-Type' => 'application/pdf'];

    return response()->file($pdf->Output(), $headers);
  }
}
