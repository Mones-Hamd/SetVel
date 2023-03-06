<?php

namespace App\Http\Controllers;

use App\Models\Contacts;
use App\Http\Requests\StoreContactsRequest;
use App\Http\Requests\UpdateContactsRequest;
use App\Http\Resources\ContactResource;
use App\Models\User;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;

class ContactsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
     return Contacts::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContactsRequest $request)
    {
        return Contacts::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {   
       
        $user_id=$user->id;
     
        $contacts= Contacts::all()->where('user_id','=',$user_id);
     
        return response(['success'=> true,
        'contacts'=>[$contacts] ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contacts $contact)
    {
       
        $data= $request->validate( ['name'=>['sometimes','required'],
        'type'=>['sometimes','required'],
        'phone'=> ['sometimes','required'],
        'address'=>['sometimes','required'],
        'user_id'=>['sometimes','required']]);
      
        $contact->update($data);
      
        new ContactResource($contact);
        return response(['success'=> true]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contacts $contact)
    {
        $contact->delete();
        return response(['success'=> true]);
    }
}
