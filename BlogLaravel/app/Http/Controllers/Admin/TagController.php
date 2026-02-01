<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::withCount('posts')
            ->orderBy('posts_count', 'desc')
            ->get();

        return response()->json([
            'tags' => $tags
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'tags' => ['required', 'array'],
            'tags.*' => ['string', 'max:50']
        ]);
        $tags = collect($request->tags)
            ->map(function ($tag) {
                return trim(strtolower($tag));
            })
            ->unique()
            ->each(function ($tag) {
                Tag::firstOrCreate([
                    'name' => $tag
                ]);
            });

        return response()->json([
            'message' => "Successfull added",
            // 'tags' => $tags,
        ]);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'tag' => ['required']
        ]);
        $tag = Tag::findOrFail($id);
        $tag->name = $request->tag;
        $tag->save();

        return response()->json([
            'message' => "Successfully Updated",
        ]);
    }
    public function destroy($id)
    {
        $tag = Tag::findOrFail($id);
        $tag->delete();

        return response()->json([
            'message' => "Successfully deleted",
        ]);
    }
}
