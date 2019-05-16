<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use setasign\Fpdi\Fpdi;

class BIRController extends Controller {
  /**
   * @param Request $Request
   */
  public function generate(Request $request) {
    $users = User::whereIN('id', $request->employee)->get();
    $pdf   = new Fpdi;
    foreach ($users as $user) {
      $name = $user->profile->formattedName;

      $pdf->AddPage();
      $pdf->setSourceFile(public_path('pdf/bir.pdf'));
      $pdf->useTemplate($pdf->importPage(1), null, null, null, null, true);

      $pdf->SetFont('Arial');
      $pdf->SetTextColor(0, 0, 0);

      $pdf->SetFontSize('8');
      $pdf->SetXY(20, 64);
      $pdf->Write(0, $user->profile->address);
      // $pdf->SetXY(20, 73);
      // $pdf->Write(0, $user->profile->address);
      $pdf->SetXY(20, 82);
      $pdf->Write(0, 'Foreign Home Address');

      $pdf->SetFontSize('10');
      $pdf->SetXY(46, 45);
      $tin    = $user->profile->tin;
      $tinNum = '';
      $i      = 1;

      foreach (str_split($tin) as $num) {
        if ($i % 3 == 0 && $i != 12) {

          $tinNum .= $num . '      ';
        } else {
          $tinNum .= $num . '  ';
        }
        $i++;
      }
      $pdf->Write(0, $tinNum);
      $pdf->SetXY(47, 34);
      $pdf->Write(0, join('  ', str_split(date('Y'))));

      $pdf->SetXY(144, 34);
      $pdf->Write(0, join('  ', str_split(date('md', strtotime('first day of this month')))));

      $pdf->SetXY(184, 34);
      $pdf->Write(0, join('  ', str_split(date('md', strtotime('last day of this month')))));

      $pdf->SetXY(20, 54);
      $pdf->Write(0, $name);

      $pdf->SetXY(18.7, 91);
      $birthday = $user->profile->birthday ? $user->profile->birthday->format('md Y ') : '';

      $pdf->Write(0, join('  ', str_split($birthday)));

      $pdf->SetXY(73, 91);
      $pdf->Write(0, $user->profile->contact_number);

      if ($user->profile->civil_status == 'Single') {
        $pdf->SetXY(35, 100);
        $pdf->Write(0, 'x');
      } else {
        $pdf->SetXY(65, 100);
        $pdf->Write(0, 'x');
      }
      // $pdf->SetXY(35, 106);
      // $pdf->Write(0, 'x');

      $pdf->SetXY(65, 106);
      $pdf->Write(0, 'x');

      $pdf->SetXY(157, 54);
      $pdf->Write(0, 'Php ' . number_format($user->computedMonthlySalary(), 2, '.', ','));
    }

    $headers = ['Content-Type' => 'application/pdf'];
    return response()->file($pdf->Output(), $headers);
  }
}
