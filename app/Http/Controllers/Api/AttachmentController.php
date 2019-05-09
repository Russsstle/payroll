<?php

namespace App\Http\Controllers\Api;

use App\Attachment;
use App\File;
use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request;

class AttachmentController extends Controller {
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    $isEmployer = Auth::user()->type == 'employer';

    $attachments = Attachment::all();

    $data = [];

    foreach ($attachments as $attachment) {
      $item = new \stdClass;

      $item->id       = $attachment->id;
      $item->name     = $attachment->user->profile->name;
      $item->document = $attachment->name;
      $item->type     = $attachment->type;
      $item->count    = $attachment->files->count();

      $data[] = $item;
    }

    return $data;
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    $attachment = new Attachment;
    $user       = Auth::user();

    $attachment->user()->associate($user);
    $attachment->fill($request->only(['name', 'type']));

    $attachment->save();

    foreach ($request->file as $requestFile) {
      $file = new File;
      $file->attachment()->associate($attachment);

      $file->filename = $requestFile->getClientOriginalName();

      $requestFile->move(public_path('uploads/' . $attachment->id . '/'), $file->filename);

      $file->save();
    }

    return ['success' => true];
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id) {
    $attachment = Attachment::find($id);

    $data = new \stdClass;

    $data->name = $attachment->name;
    $data->type = $attachment->type;

    $files = [];

    foreach ($attachment->files as $file) {
      $item = new \stdClass;

      $item->id   = $file->id;
      $item->url  = asset('uploads/' . $attachment->id . '/' . $file->filename);
      $item->name = $file->filename;

      $files[] = $item;
    }

    $data->files = $files;

    return $data;
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    $attachment = Attachment::find($id);
    $attachment->fill($request->only(['name', 'type']));

    $attachment->save();

    if ($request->attachmentsToDelete) {
      foreach ($request->attachmentsToDelete as $id) {
        $file = File::find($id);
        $file->delete();
      }
    }

    if ($request->file) {
      foreach ($request->file as $requestFile) {
        $file = new File;
        $file->attachment()->associate($attachment);

        $file->filename = $requestFile->getClientOriginalName();

        $requestFile->move(public_path('uploads/' . $attachment->id . '/'), $file->filename);

        $file->save();
      }
    }

    return ['success' => true];
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id) {
    //
  }
}
