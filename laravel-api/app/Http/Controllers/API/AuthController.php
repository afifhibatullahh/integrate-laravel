<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                "message" => "Register gagal",
                "data" => $validator->errors()
            ]);
        }

        $user = $request->all();
        $user['password'] = Hash::make($user['password']);

        $userCreated = User::create($user);

        $response['token'] = $userCreated->createToken('auth_token')->plainTextToken;
        $response['name'] = $userCreated->name;

        return response()->json([
            'success' => true,
            'message' => 'Register berhasil',
            'data' => $response
        ]);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        $data = [
            'token' => $user->createToken('auth_token')->plainTextToken,
            'name' => $user->name,
            'email' => $user->email,
        ];

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil',
            'data' => $data
        ]);
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();
        return response()->json([
            'message' => 'logout success'
        ]);
    }
}
