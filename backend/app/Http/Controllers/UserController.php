<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        return User::select('id','name','email')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required',
            'email'    => 'required',
            'password' => 'required'
        ]);
        try{
            $user = User::create([
                'name'      => $request->name,
                'email'     => $request->email,
                'password'  => bcrypt($request->password)
            ]);
            return response()->json([
                'message'=>'User create successfully !'
            ]);
        }catch(\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Failed to create user !'
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        return response()->json([
            'user'=>$user
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {   
        $user = User::find($id);
        $request->validate([
            'name'      =>'required',
            'email'     =>'required',
        ]);

        try{
            $user->fill([
                'name'      => $request->name,
                'email'     => $request->email,
                'password'  => bcrypt($request->password)
            ])->update();

            return response()->json([
                'message'=>'Edit User successfully !'
            ]);
        }catch(\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Failed to edit user !'
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {   
        $user = User::find($id);
        try{
            $user->delete();

            return response()->json([
                'message'=>'User deleted successfully !'
            ]);
        }catch(\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Failed to delete user !'
            ]);
        }
    }
}
