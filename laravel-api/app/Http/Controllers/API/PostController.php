<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Console\Input\Input;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $search  = $request->input('search') ?? '';
        $orderBy  = $request->input('orderBy') ?? 'desc';
        $status  = $request->input('status') ?? '';

        $posts = DB::table('posts')
            ->where([['judul', 'LIKE', "%" . $search . "%"]])
            ->where([['status', 'LIKE', "%" . $status . "%"]])
            ->orderBy('tgl_publikasi', $orderBy)
            ->paginate(10);
        return response()->json(['data' => $posts], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'judul' => 'required',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg',
            'konten' => 'required',
            'status' => 'required',
            'tgl_publikasi' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                "message" => "Terjadi Kesalahan",
                "data" => $validator->errors()
            ]);
        }

        $thumbnail_name = time() . '.' . $request->thumbnail->extension();
        $request->thumbnail->move(public_path('thumbnails'), $thumbnail_name);

        $created = Post::create([
            'judul' => $request->judul,
            'konten' => $request->konten,
            'status' => $request->status,
            'tgl_publikasi' => $request->tgl_publikasi,
            'thumbnail' => $thumbnail_name
        ]);

        return response()->json([
            'success' => true,
            "message" => "Berhasil ditambahkan",
            "data" => $created
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                "message" => "Data tidak ditemukan",
            ], 404);
        }

        return response()->json(['data' => $post], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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

        $validator = Validator::make($request->all(), [
            'judul' => 'required',
            'thumbnail' => 'image|mimes:jpeg,png,jpg',
            'konten' => 'required',
            'status' => 'required',
            'tgl_publikasi' => 'required',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                "message" => "Terjadi Kesalahan",
                "data" => $validator->errors()
            ]);
        }

        $post =  Post::where('id', $id)->get();

        if ($request->thumbnail != '') {
            $path = public_path('thumbnails/');

            if ($post->thumbnail != ''  && $post->thumbnail != null) {
                $thumbnail_old = $path . $post->thumbnail;
                if (file_exists($thumbnail_old)) unlink($thumbnail_old);
            }

            $thumbnail_name = time() . '.' . $request->thumbnail->extension();
            $request->thumbnail->move($path, $thumbnail_name);
        }

        $updated = Post::where('id', $id)->update($request->all());

        if (!$updated) {
            return response()->json([
                "message" => "Data gagal diubah",
            ]);
        }

        return response()->json(['message' => 'Data berhasil diubah', 'data' => $updated], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::find($id);

        if ($post) {
            if ($post->thumbnail != ''  && $post->thumbnail != null) {
                $thumbnail_old = public_path('thumbnails/') . $post->thumbnail;
                if (file_exists($thumbnail_old)) {
                    unlink($thumbnail_old);
                }
            }
            $post->delete();
            return  response()->json(['data' => $post, 'message' => 'Data berhasil dihapus'], 200);
        } else
            return  response()->json(['data' => $post, 'message' => 'Data gagal dihapus'], 403);
    }
}
