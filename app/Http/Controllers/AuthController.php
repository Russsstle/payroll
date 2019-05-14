<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use JWTAuth;

class AuthController extends Controller {
  /**
   * Login with username and password
   *
   * @return token
   */
  public function login() {
    if (!$token = auth()->attempt(request()->only(['username', 'password']))) {
      return response()->json(['message' => 'Invalid Username and/or Password'], 401);
    }

    return response()->json([
      'token' => $token
    ]);
  }

  public function logout() {
    auth()->logout();
  }

  /**
   * @return mixed
   */
  public function getAuthenticatedUser() {
    $error = null;

    try {
      if (!$user = JWTAuth::parseToken()->authenticate()) {
        return response()->json(['user_not_found'], 404);
      }
    } catch (\Exception $e) {
      if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
        $error = 'Token Expired';
      } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
        $error = 'Token Invalid';
      } else if ($e instanceof \Tymon\JWTAuth\Exceptions\JWTException) {
        $error = 'Token Absent';
      }

      return response()->json(['error' => $error], 403);
    }

    $data = [
      'id'       => $user->id,
      'username' => $user->username,
      'name'     => $user->profile->name,
      'avatar'   => asset($user->profile->avatar)
    ];

    return $data;
  }
}
