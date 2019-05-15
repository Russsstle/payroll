<?php

namespace App\Http\Controllers;

use App\Company;
use App\Role;
use App\User;
use Illuminate\Http\Request;
use setasign\Fpdi\Fpdi;

class PdfController extends Controller {
  /**
   * @param $id
   */
  public function generateBIR() {
    $users = User::all();
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
  /**
   * @param $id
   */
  public function generateER1($id) {
    $user = User::find($id);
    $name = Company::all()->first()->user->profile->name;
    $pdf  = new Fpdi;

    $pdf->AddPage();
    $pdf->setSourceFile(public_path('pdf/er1.pdf'));
    $pdf->useTemplate($pdf->importPage(1), null, null, null, null, true);
    $pdf->SetFont('Arial');
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetFontSize('8');

    $pdf->SetXY(20, 64);
    $pdf->Write(0, '');
    $headers = ['Content-Type' => 'application/pdf'];
    return response()->file($pdf->Output(), $headers);
  }
  /**
   * @param $id
   */
  public function generateRF1() {
    $users = User::where('role_id', '<>', 1)->get();
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
  public function generateMembershipRemittance() {
    $users = User::all();

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
  /**
   * @param $id
   */
  public function generatePMRF($id) {
    $user = User::find($id);
    $name = $user->profile->last_name . ' , ' . $user->profile->first_name . ' ' . $user->profile->middle_name;
    $pdf  = new Fpdi;

    $pdf->AddPage();
    $pdf->setSourceFile(public_path('pdf/pmrf_revised.pdf'));
    $pdf->useTemplate($pdf->importPage(1), null, null, null, null, true);

    $pdf->SetFont('Arial');
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetFontSize('10');
    $philNum = '';
    $i       = 1;

    foreach (str_split($user->profile->philhealth) as $num) {
      if ($i % 4 == 0) {
        $philNum .= $num . '    ';
      } else {
        $philNum .= $num . '    ';
      }
      $i++;
    }
    $pdf->SetXY(135, 31.5);
    $pdf->Write(0, $philNum);

    $pdf->SetXY(20, 55);
    $pdf->Write(0, $user->profile->last_name);
    $pdf->SetXY(72, 55);
    $pdf->Write(0, $user->profile->first_name);
    $pdf->SetXY(167, 55);
    $pdf->Write(0, $user->profile->middle_name);

    $pdf->SetXY(12, 79);
    $pdf->Write(0, $user->profile->birthday->format('m-d-Y '));
    // $pdf->SetXY(49, 79);
    // $pdf->Write(0, $user->profile->address);

    // $pdf->SetXY(38, 79);
    // $pdf->Write(0, $user->profile->address);
    if ($user->profile->gender == 'Male') {
      $pdf->SetXY(85.8, 77.4);
      $pdf->Write(0, 'x');
    } else {
      $pdf->SetXY(85.8, 81.3);
      $pdf->Write(0, 'x');
    }

    switch ($user->profile->civil_status) {
    case 'single':
      $pdf->SetXY(101.5, 77.4);
      $pdf->Write(0, 'x');
      break;
    case 'married':
      $pdf->SetXY(101.5, 81.3);
      $pdf->Write(0, 'x');

      break;
    case 'widower':
      $pdf->SetXY(115.2, 77.4);
      $pdf->Write(0, 'x');

      break;
    case 'legally_separated':
      $pdf->SetXY(115.2, 81.3);
      $pdf->Write(0, 'x');
      break;

    }
    $pdf->SetFontSize('9');
    $pdf->SetXY(149, 79);
    $pdf->Write(0, ucfirst($user->profile->nationality));
    $pdf->SetFontSize('10');
    // $i      = 1;
    // $tinNum = '';
    // foreach (str_split($user->profile->tin) as $num) {
    //   if ($i % 3 == 0 && $i != 3) {

    //     $tinNum .= $num . '-';
    //   } else {
    //     $tinNum .= $num;
    //   }
    //   $i++;
    // }
    $pdf->SetXY(170, 79);
    $pdf->Write(0, $user->profile->tin);
    $pdf->SetXY(86.5, 116);
    $pdf->Write(0, $user->profile->mobile_number);
    $pdf->SetXY(143, 116);
    $pdf->Write(0, $user->profile->email);

    $headers = ['Content-Type' => 'application/pdf'];
    return response()->file($pdf->Output(), $headers);
  }
  /**
   * @param $id
   */
  public function generatemMemberContributionRemittance($id) {
    $user    = User::find($id);
    $name    = Company::all()->first()->user->profile->name;
    $company = Company::all()->first()->name;
    $pagibig = Company::all()->first()->user->profile->pagibig;
    $i       = 1;
    $loveNum = '';
    foreach (str_split($pagibig) as $num) {
      if ($i % 3 == 0 && $i != 12) {
        $loveNum .= $num . '-';
      } else {
        $loveNum .= $num;
      }
      $i++;
    }

    $pdf = new Fpdi;

    $pdf->AddPage();
    $pdf->setSourceFile(public_path('pdf/FPF060_MembersContributionRemittance_V01.pdf'));
    $pdf->useTemplate($pdf->importPage(1), null, null, null, null, true);

    $pdf->SetFont('Arial');
    $pdf->SetFontSize('9');
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetXY(10, 56.5);
    $pdf->Write(0, $name . ' / ' . $company);
    $pdf->SetXY(155, 38.5);
    $pdf->Write(0, $loveNum);

    $headers = ['Content-Type' => 'application/pdf'];
    return response()->file($pdf->Output(), $headers);
  }
  /**
   * @param $id
   */

  /**
   * @param $id
   */
  public function generateMemberLoanPaymentReturn() {
    // $user = User::find($id);
    // $name = $user->profile->last_name . ' , ' . $user->profile->first_name . ' ' . $user->profile->middle_name;
    $pdf = new Fpdi;

    $pdf->AddPage();
    $pdf->setSourceFile(public_path('pdf/SSSForm_Member_Loan_Payment_Return.pdf'));
    $pdf->useTemplate($pdf->importPage(1), null, null, null, null, true);

    $pdf->SetFont('Arial');
    $pdf->SetTextColor(0, 0, 0);
    $headers = ['Content-Type' => 'application/pdf'];
    return response()->file($pdf->Output(), $headers);
  }
  /**
   * @param $id
   */
  public function generateContributionCollectionList() {
    // $user = User::find($id);
    // $name = $user->profile->last_name . ' , ' . $user->profile->first_name . ' ' . $user->profile->middle_name;
    $pdf = new Fpdi;

    $pdf->AddPage();
    $pdf->setSourceFile(public_path('pdf/SSSForms_Contribution_Collection_List.pdf'));
    $pdf->useTemplate($pdf->importPage(1), null, null, null, null, true);

    $pdf->SetFont('Arial');
    $pdf->SetTextColor(0, 0, 0);
    $headers = ['Content-Type' => 'application/pdf'];
    return response()->file($pdf->Output(), $headers);
  }
  /**
   * @param $id
   */
  public function generateEmploymentReport() {
    // $user = User::find($id);
    // $name = $user->profile->last_name . ' , ' . $user->profile->first_name . ' ' . $user->profile->middle_name;
    $pdf = new Fpdi;

    $pdf->AddPage();
    $pdf->setSourceFile(public_path('pdf/SSSForms_Employment_Report.pdf'));
    $pdf->useTemplate($pdf->importPage(1), null, null, null, null, true);

    $pdf->SetFont('Arial');
    $pdf->SetTextColor(0, 0, 0);
    $headers = ['Content-Type' => 'application/pdf'];
    return response()->file($pdf->Output(), $headers);
  }
  /**
   * @param $id
   */
  public function generateContributionPayment() {
    // $user = User::find($id);
    // $name = $user->profile->last_name . ' , ' . $user->profile->first_name . ' ' . $user->profile->middle_name;
    $pdf = new Fpdi;

    $pdf->AddPage();
    $pdf->setSourceFile(public_path('pdf/SSSForms_ER_Contribution_Payment.pdf'));
    $pdf->useTemplate($pdf->importPage(1), null, null, null, null, true);

    $pdf->SetFont('Arial');
    $pdf->SetTextColor(0, 0, 0);
    $headers = ['Content-Type' => 'application/pdf'];
    return response()->file($pdf->Output(), $headers);
  }

}
