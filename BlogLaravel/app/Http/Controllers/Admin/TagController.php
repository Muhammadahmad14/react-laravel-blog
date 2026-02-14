<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        $tags = Tag::with('user:id,name')
            ->withCount('posts')
            ->when(
                $search,
                fn($q) =>
                $q->where('name', 'like', "%$search%")
            )
            ->orderByDesc('posts_count')
            ->paginate(5, ['id', 'name', 'created_at']);

        return response()->json(['tags' => $tags]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tags' => ['required'],
            'tags.*' => ['string', 'max:50']
        ]);
        $tags = collect($request->tags)
            ->map(function ($tag) {
                return trim(strtolower($tag));
            })
            ->unique()
            ->each(function ($tag) {
                Tag::firstOrCreate(
                    [
                        'name' => $tag
                    ],
                    [
                        'user_id' => auth()->id()
                    ]
                );
            });

        return response()->json([
            'message' => "Successfull added",
        ]);
    }
    
    public function show($id)
    {
        $tag = Tag::findOrFail($id);
        return response()->json([
            'tag' => $tag
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
