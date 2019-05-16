<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use setasign\Fpdi\Fpdi;

class ERFController extends Controller {
  /**
   * @param Request $request
   */
  public function generate(Request $request) {
    $users = User::where('role_id', '<>', 1)->whereIN('id', $request->employee)->get();
// $name = Company::all()->first()->user->profile->name;
    $pdf = new Fpdi;
    $pdf->SetFont('Arial');
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetFontSize('8');
    for ($i = 0, $y = 91.5; $i < count($users); $i++) {
      $user = $users[$i];
      if ($i % 10 == 0) {
        $pdf->AddPage();
        $pdf->setSourceFile(public_path('pdf/EmployerRF1.pdf'));
        $pdf->useTemplate($pdf->importPage(1), null, null, null, null, true);
        $y = 91.5;
      }
      $pdf->SetXY(26, $y);
      $philHealth    = $user->profile->philhealth;
      $philHealthNum = '';
      $j             = 1;
      // $philHealthNum .= $philHealth;
      foreach (str_split($philHealth) as $num) {
        if ($j == 2 || $j == 11) {
          $philHealthNum .= $num . '      ';
        } else {
          $philHealthNum .= $num . '    ';
        }
        $j++;
      }
      $pdf->Write(0, $philHealthNum);

      $pdf->SetXY(98, $y);
      $pdf->Write(0, $user->profile->last_name);
      $pdf->SetXY(140, $y);
      $pdf->Write(0, $user->profile->first_name);
      $pdf->SetXY(195, $y);
      $pdf->Write(0, $user->profile->middle_name);
      $pdf->SetXY(225, $y);
      $birthday = $user->profile->birthday ? $user->profile->birthday->format('m d  Y ') : '';
      $pdf->Write(0, join(' ', str_split($birthday)));
      $pdf->SetXY(253, $y);
      $gender = $user->profile->gender == 'Male' ? 'M' : 'F';
      $pdf->Write(0, $gender);
      $y += 9;
    }
// $pdf->AddPage();
    // $pdf->setSourceFile(public_path('pdf/EmployerRF1.pdf'));
    // $pdf->useTemplate($pdf->importPage(1), null, null, null, null, true);

    $headers = ['Content-Type' => 'application/pdf'];
    return response()->file($pdf->Output(), $headers);
  }
}
