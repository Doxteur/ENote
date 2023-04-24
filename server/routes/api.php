<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// import User model
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/login', function (Request $request) {
    // return json
    if(!$request->has('name') || !$request->has('password')) {
        return response()->json([
            'message' => 'Login failed',
            'error' => 'Invalid credentials',
        ], 401);
    }else{
        $user = User::where('name', $request->name)->first();
        if(!$user) {
            return response()->json([
                'message' => 'Login failed',
                'error' => 'Invalid credentials',
            ], 401);
        }else{
            if(!Hash::check($request->password, $user->password)) {
                return response()->json([
                    'message' => 'Login failed',
                    'error' => 'Invalid credentials',
                ], 401);
            }else{
                $token = $user->createToken('auth_token')->plainTextToken;
                return response()->json([
                    'message' => 'Login successful',
                    'token' => $token,
                ], 200);
            }
        }
    }
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

