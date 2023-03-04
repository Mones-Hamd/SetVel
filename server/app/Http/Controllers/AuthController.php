<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    private function createAccessToken($user){
return  $token =$user->createToken('main')->plainTextToken;
    }
 public function signup(SignupRequest $request){
    $data=$request->validate();
    /** @var \App\Models\User $user */
    $user=User::create([
        'name'=>$data['name'],
        'email'=>$data['email'],
        'password'=>bcrypt($data['password'])
    ]);
    $token =self:: createAccessToken($user);
    return response(['success'=> true,
    'user'=>$user,
    'token'=> $token]);
 }
 public function login (LoginRequest $request){
    $credentials =$request->validate();
    $remember =$credentials['remember'] ?? false;
    unset($credentials['remember']);
    if(!Auth::attempt($credentials,$remember)){
        return response(['error'=>'the provided credentials are not correct '],422);
    }
    $user =Auth::user();
    $token =self::createAccessToken($user);
    return response(['success'=> true,
    'user'=>$user,
    'token'=> $token]);
 }
 public function logout (Request $request){
    /** @var User $user */
    $user =Auth::user();
    $user->currentAccessToken()->delete;
    return response(['success'=> true]);


 } 
}
