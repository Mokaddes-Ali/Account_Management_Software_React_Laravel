<?php

// namespace App\Http\Controllers;
// use App\Models\Client;
// use Illuminate\Http\Request;


// class ClientController extends Controller
// {
//     public function index(){
//         return view('admin.client.add');
//     }

//     public function show(){
//         $all = Client::all();
//         return view('admin.client.show', compact('all'));
//     }
//     public function create(Request $request){
//             $request->validate([
//             'name' => 'required|max:40',
//             'email' => 'required',
//             'number' => 'required',
//             'address' => 'required',
//             'pic' => 'required|image|mimes:jpeg,png,gif|max:2048',
//         ]);

//         $image_rename = '';
//         if ($request->hasFile('pic')) {
//             $image = $request->file('pic');
//             $ext = $image->getClientOriginalExtension();
//             $image_rename = time() . '_' . rand(100000, 10000000) . '.' . $ext;
//             $image->move(public_path('images'), $image_rename);
//         }

//         $insert = Client::insertGetId([
//             'name' => $request['name'],
//             'email' => $request['email'],
//             'number' => $request['number'],
//             'address' => $request['address'],
//             'pic' => $image_rename ,
//             'created_at' => now(),
//             'updated_at' => now(),
//         ]);

//         if ($insert) {
//             return redirect()-> route('show')->with('success', 'Data inserted successfully');

//         } else {
//             return back()->with('fail', 'Data insertion failed');
//         }
//     }

//     public function edit($id){
//         $record = Client::findOrFail($id);
//         return view('admin.client.edit', compact('record'));
//     }

//     public function update(Request $request){
//          //dd($request->all());
//         $id = $request->id;
//          $request->validate([
//             'name' => 'required|max:40',
//             'email' => 'required',
//             'number' => 'required',
//             'address' => 'required',
//             'pic' => 'nullable|mimes:jpeg,png,gif|max:2048',
//         ]);

//         $oldimg = Client::findOrFail($id);
//         $deleteimg=public_path('images/'.$oldimg['pic']);
//         $image_rename = '';

//         if ($request->hasFile('pic')) {
//             $image = $request->file('pic');
//             $ext = $image->getClientOriginalExtension();

//             if(file_exists($deleteimg)){
//                 unlink($deleteimg);
//               }

//             $image_rename = time() . '_' . rand(100000, 10000000) . '.' . $ext;
//             $image->move(public_path('images'), $image_rename);
//             }
//             else{
//                 $image_rename=$oldimg['pic'];
//             }

//         $update = Client::where('id',$id)->update([
//             'name' => $request->name,
//             'email' => $request->email,
//             'number' => $request->number,
//             'address' => $request->address,
//             'pic' => $image_rename,
//             'created_at' => now(),
//             'updated_at' => now(),
//         ]);

//         if ($update) {
//             return back()->with('success', 'Data updated successfully');
//         } else {
//             return back()->with('fail', 'Data update failed');
//         }
//     }
//     public function destroy($id){
//         $id=intval($id);
//         $client = Client::find($id);
//         if ($client) {
//             $imagePath = public_path('images/' . $client->pic);
//             if (file_exists($imagePath)) { // Check if it's a file
//                 unlink($imagePath);
//             }
//             $client->delete();
//             return back()->with('success', 'Data deleted successfully');
//         }
//     }
// }



namespace App\Http\Controllers;

use App\Models\Client;
use Inertia\Inertia;

use Illuminate\Support\Facades\Validator;

use App\Notifications\ClientStatusNotification;

use Illuminate\Support\Facades\Mail;

use App\Mail\ClientStatusMail;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ClientController extends Controller
{
    // Paths for storing images
    protected $clientImagePath = 'uploads/clients';
    protected $nidImagePath = 'uploads/nids';
    protected $guarantorImagePath = 'uploads/guarantors';

    public function index()
    {
        return view('admin.client.add');
    }

    public function show()
    {
        $all = Client::with('user')->get();
        return view('admin.client.show', compact('all'));
    }

    public function approve(Client $client)
{
    $client->update(['status' => 'approved']);


    // Mail::to($client->user->email)->send(new ClientStatusMail($client, 'approved'));


    $client->user->notify(new ClientStatusNotification($client, 'approved'));

    return redirect()->route('client.show')->with('success', 'Application approved!');
}

public function reject(Client $client)
{
    $client->update(['status' => 'rejected']);


    // Mail::to($client->user->email)->send(new ClientStatusMail($client, 'rejected'));


    $client->user->notify(new ClientStatusNotification($client, 'rejected'));

    return redirect()->route('client.show')->with('error', 'Application rejected!');
}



    // Show the form for creating a new client
    public function create()
    {
        return view('admin.client.add');
    }

    // Store a newly created client in the database
    public function store(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:40',
            'father_name' => 'required|max:40',
            'mother_name' => 'required|max:40',
            'phone_number' => 'required|max:15',
            'date_of_birth' => 'required|date',
            'nid_number' => 'required|unique:clients',
            'nid_pic_font' => 'nullable|image|mimes:jpg,gif,webp,png,jpeg|max:2048',
            'nid_pic_back' => 'nullable|image|mimes:jpg,gif,webp,png,jpeg|max:2048',
            'occupation' => 'required|max:40',
            'monthly_income' => 'required|numeric',
            'present_district' => 'required|max:40',
            'present_upazila' => 'required|max:40',
            'present_village' => 'nullable|max:40',
            'present_postcode' => 'nullable|max:10',
            'permanent_district' => 'required|max:40',
            'permanent_upazila' => 'required|max:40',
            'permanent_postcode' => 'nullable|max:10',
            'permanent_village' => 'nullable|max:40',
            'email' => 'required|email|unique:clients',
            'number' => 'required|unique:clients',
            'emergency_contact_name' => 'required|max:40',
            'pic' => 'nullable|image|mimes:jpg,gif,webp,png,jpeg|max:2048',
            'guarantor_name' => 'required|max:40',
            'guarantor_nid' => 'required|max:20',
            'guarantor_nid_pic_font' => 'nullable|image|mimes:jpg,gif,webp,png,jpeg|max:2048',
            'guarantor_nid_pic_back' => 'nullable|image|mimes:jpg,gif,webp,png,jpeg|max:2048',
            'guarantor_address' => 'required|max:255',
            'guarantor_occupation' => 'required|max:40',
            'guarantor_monthly_income' => 'nullable|numeric',
            'guarantor_phone_number' => 'required|max:15',
            'guarantor_email' => 'nullable|email',
            'guarantor_pic' => 'nullable|image|mimes:jpg,gif,webp,png,jpeg|max:2048',
            'guarantor_relation' => 'required|max:40',
            'creator' => 'nullable|exists:users,id',
            'editor' => 'nullable|exists:users,id',
            'slug' => 'nullable|max:50',
        ]);

        if ($validator->fails()) {
            return Inertia::render('Client/Create', [
                'errors' => $validator->errors(),
                'formData' => $request->all(),
            ]);
        }

        // Handle file uploads
        $data = $request->except(['_token', 'pic', 'nid_pic_font', 'nid_pic_back', 'guarantor_nid_pic_font', 'guarantor_nid_pic_back', 'guarantor_pic']);

        $data['user_id'] = auth()->id();
        $data['creator'] = auth()->id();
        $data['editor'] = auth()->id();

         // Dynamic slug generation (6-digit unique number)
    do {
        $data['slug'] = str_pad(mt_rand(1, 999999), 6, '0', STR_PAD_LEFT);
    } while (Client::where('slug', $data['slug'])->exists());
        if ($request->hasFile('pic')) {
            $data['pic'] = $this->uploadImage($request->file('pic'), $this->clientImagePath);
        }
        if ($request->hasFile('nid_pic_font')) {
            $data['nid_pic_font'] = $this->uploadImage($request->file('nid_pic_font'), $this->nidImagePath);
        }
        if ($request->hasFile('nid_pic_back')) {
            $data['nid_pic_back'] = $this->uploadImage($request->file('nid_pic_back'), $this->nidImagePath);
        }
        if ($request->hasFile('guarantor_nid_pic_font')) {
            $data['guarantor_nid_pic_font'] = $this->uploadImage($request->file('guarantor_nid_pic_font'), $this->guarantorImagePath);
        }
        if ($request->hasFile('guarantor_nid_pic_back')) {
            $data['guarantor_nid_pic_back'] = $this->uploadImage($request->file('guarantor_nid_pic_back'), $this->guarantorImagePath);
        }
        if ($request->hasFile('guarantor_pic')) {
            $data['guarantor_pic'] = $this->uploadImage($request->file('guarantor_pic'), $this->guarantorImagePath);
        }

        // Insert data into the database
        $client = Client::create($data);

        if ($client) {
            return Inertia::render('Client/Index', [
                'success' => true,
                'message' => 'Client created successfully!',
            ]);
        } else {
            return Inertia::render('Client/Create', [
                'success' => false,
                'message' => 'Failed to create client.',
            ]);
        }
    }

    // Show client details (for user)
    public function showClientInfo(Client $client)
    {
        if ($client->user_id !== auth()->id()) {
            abort(403);
        }
        return view('admin.client.user', compact('client'));
    }

    public function singleClientshow($id){
        $client = Client::findOrFail($id);
        return view('admin.client.user', compact('client'));
    }


    public function edit($id)
    {
        $record = Client::findOrFail($id);
        return view('admin.client.edit', compact('record'));
    }

    public function update(Request $request, Client $client)
    {
        // Validate the request
        $request->validate([
            'name' => 'required|max:40',
            'father_name' => 'required|max:40',
            'mother_name' => 'required|max:40',
            'phone_number' => 'required|max:15',
            'date_of_birth' => 'required|date',
            'nid_number' => 'required',
            'nid_pic_font' => 'nullable|image|mimes:jpg,gif,webp,png,jpeg|max:2048',
            'nid_pic_back' => 'nullable|image|mimes:jpg,gif,webp,png,jpeg|max:2048',
            'occupation' => 'required|max:40',
            'monthly_income' => 'required|numeric',
            'present_district' => 'required|max:40',
            'present_upazila' => 'required|max:40',
            'present_village' => 'nullable|max:40',
            'present_postcode' => 'nullable|max:10',
            'permanent_district' => 'required|max:40',
            'permanent_upazila' => 'required|max:40',
            'permanent_postcode' => 'nullable|max:10',
            'permanent_village' => 'nullable|max:40',
            'email' => 'required|email',
            'number' => 'required|numeric',
            'emergency_contact_name' => 'required|max:40',
            'pic' => 'nullable|image|mimes:jpg,gif,webp,png,jpeg|max:2048',
            'guarantor_name' => 'required|max:40',
            'guarantor_nid' => 'required|max:20',
            'guarantor_nid_pic_font' => 'nullable|image|mimes:jpg,gif,webp,png,jpeg|max:2048',
            'guarantor_nid_pic_back' => 'nullable|image|mimes:jpg,gif,webp,png,jpeg|max:2048',
            'guarantor_address' => 'required|max:255',
            'guarantor_occupation' => 'required|max:40',
            'guarantor_monthly_income' => 'nullable|numeric',
            'guarantor_phone_number' => 'required|max:15',
            'guarantor_email' => 'nullable|email',
            'guarantor_pic' => 'nullable|image|mimes:jpg,gif,webp,png,jpeg|max:2048',
            'guarantor_relation' => 'required|max:40',
        ]);

        // Prepare data
        $data = $request->except(['_token', 'pic', 'nid_pic_font', 'nid_pic_back', 'guarantor_nid_pic_font', 'guarantor_nid_pic_back', 'guarantor_pic']);
        $data['editor'] = auth()->id();

        // Handle image updates
        if ($request->hasFile('pic')) {
            $this->deleteOldImage($client->pic);
            $data['pic'] = $this->uploadImage($request->file('pic'), $this->clientImagePath);
        }
        if ($request->hasFile('nid_pic_font')) {
            $this->deleteOldImage($client->nid_pic_font);
            $data['nid_pic_font'] = $this->uploadImage($request->file('nid_pic_font'), $this->nidImagePath);
        }
        if ($request->hasFile('nid_pic_back')) {
            $this->deleteOldImage($client->nid_pic_back);
            $data['nid_pic_back'] = $this->uploadImage($request->file('nid_pic_back'), $this->nidImagePath);
        }
        if ($request->hasFile('guarantor_nid_pic_font')) {
            $this->deleteOldImage($client->guarantor_nid_pic_font);
            $data['guarantor_nid_pic_font'] = $this->uploadImage($request->file('guarantor_nid_pic_font'), $this->guarantorImagePath);
        }
        if ($request->hasFile('guarantor_nid_pic_back')) {
            $this->deleteOldImage($client->guarantor_nid_pic_back);
            $data['guarantor_nid_pic_back'] = $this->uploadImage($request->file('guarantor_nid_pic_back'), $this->guarantorImagePath);
        }
        if ($request->hasFile('guarantor_pic')) {
            $this->deleteOldImage($client->guarantor_pic);
            $data['guarantor_pic'] = $this->uploadImage($request->file('guarantor_pic'), $this->guarantorImagePath);
        }

        // Update client data
        $updated = $client->update($data);

        if ($updated) {
            return redirect()->route('client.show')->with('success', 'Client updated successfully.');
        } else {
            return back()->with('error', 'Failed to update client.');
        }
    }

    // Delete old image before replacing
    private function deleteOldImage($imagePath)
    {
        if ($imagePath && file_exists(public_path($imagePath))) {
            unlink(public_path($imagePath));
        }
    }


    public function destroy($id)
    {
        $client = Client::find($id);
        if ($client) {
            // Delete all associated images
            $this->deleteImage($client->pic, $this->clientImagePath);
            $this->deleteImage($client->nid_pic_font, $this->nidImagePath);
            $this->deleteImage($client->nid_pic_back, $this->nidImagePath);
            $this->deleteImage($client->guarantor_nid_pic_font, $this->guarantorImagePath);
            $this->deleteImage($client->guarantor_nid_pic_back, $this->guarantorImagePath);
            $this->deleteImage($client->guarantor_pic, $this->guarantorImagePath);

            $client->delete();
            return back()->with('success', 'Data deleted successfully');
        }
    }

    // Helper function to upload images
    private function uploadImage($image, $path)
    {
        if (!File::exists(public_path($path))) {
            File::makeDirectory(public_path($path), 0777, true, true);
        }

        $ext = $image->getClientOriginalExtension();
        $imageName = time() . '_' . rand(100000, 10000000) . '.' . $ext;
        $image->move(public_path($path), $imageName);
        return $imageName;
    }

    // Helper function to delete images
    private function deleteImage($imageName, $path)
    {
        if ($imageName && file_exists(public_path($path . $imageName))) {
            unlink(public_path($path . $imageName));
        }
    }
}
