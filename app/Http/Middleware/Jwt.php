<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use JWTAuth;

class Jwt {
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle($request, Closure $next) {
    try {
      JWTAuth::parseToken()->authenticate();
    } catch (\Exception $e) {
      if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
        $error = 'Token Expired';
      } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
        $error = 'Token Invalid';
      } else if ($e instanceof \Tymon\JWTAuth\Exceptions\JWTException) {
        $error = 'Token Absent';
      }
      if (app()->environment('production')) {
        abort(403);
      }
    }
    return $next($request);
  }
}
