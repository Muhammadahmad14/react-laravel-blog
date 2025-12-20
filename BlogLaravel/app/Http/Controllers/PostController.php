<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostController extends Controller
{
    // index 
    public function index()
    {
        $posts = Post::with([
            'user:id,name',
            'comments.user:id,name',
            'tags:id,name'
        ])
            ->withCount(['likes', 'comments'])
            ->latest()
            ->get(['id', 'title', 'body', 'image', 'user_id', 'created_at']);

        $posts = $posts->transform(function ($post) {
            $post->liked_by_user = $post->likes->contains('user_id', Auth::id());
            return $post;
        });

        return response()->json($posts, 200);
    }


    // add
    public function store(Request $request)
    {
        $attributes = $request->validate([
            'title' => ['required'],
            'body'  => ['required',],
            'image' => ['nullable', 'image'],
            'tags'  => ['nullable', 'array'],
            'tags.*' => ['nullable', 'string']
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('posts', 'public');
            $attributes['image'] = $path;
        }


        $attributes['user_id'] = Auth::id();

        // Create unique slug
        $attributes['slug'] = Str::slug($attributes['title'] . '-' . time());
        $post = Post::create($attributes);

        // Store tags
        $tagIds = [];
        if ($request->has('tags') && is_array($request->tags)) {
            foreach ($request->tags as $tagName) {
                $tag = Tag::firstOrCreate(['name' => trim($tagName)]);
                $tagIds[] = $tag->id;
            }
        }
        if (!empty($tagIds)) {
            $post->tags()->attach($tagIds);
        }

        return response()->json([
            'message' => 'Post created successfully',
            // 'post'    => $post
        ], 201);
    }


    // show (single post by slug)
    public function show($slug)
    {
        $post = Post::with([
            'user:id,name,profile_img', // <-- add profile_img here
            'comments.user:id,name,profile_img', // optional if you want comment users' images
            'tags:id,name',
            'likes.user:id,name'
        ])
            ->withCount(['likes', 'comments'])
            ->where('slug', $slug)
            ->firstOrFail();

        $post->liked_by_user = $post->likes->contains('user_id', Auth::id());

        return response()->json([
            'post' => $post
        ]);
    }

    // update
    public function update(Request $request, $id)
    {
        $attributes = $request->validate([
            'title' => ['required'],
            'body'  => ['required', 'min:10'],
            'image' => ['sometimes', 'nullable', 'image'],
            'tags'  => ['nullable', 'array'],
            'tags.*' => ['nullable', 'string']
        ]);

        $post = Post::findOrFail($id);

        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($request->removeImage) {
            $post->image = null;
            if ($post->image && Storage::disk('public')->exists($post->image)) {
                Storage::disk('public')->delete($post->image);
            }
        }
        if ($request->hasFile('image')) {
            if ($post->image && Storage::disk('public')->exists($post->image)) {
                Storage::disk('public')->delete($post->image);
            }
            $path = $request->file('image')->store('posts', 'public');
            $attributes['image'] = $path;
        }

        $post->slug = Str::slug($attributes['title'] . '-' . $post->id);

        // Update tags
        $tagIds = [];
        if ($request->has('tags') && is_array($request->tags)) {
            foreach ($request->tags as $tagName) {
                $tag = Tag::firstOrCreate(['name' => trim($tagName)]);
                $tagIds[] = $tag->id;
            }
        }
        if (!empty($tagIds)) {
            $post->tags()->sync($tagIds);
        }

        $post->update($attributes);

        return response()->json([
            'message' => 'Post updated successfully',
            'post'    => $post
        ], 200);
    }


    // delete
    public function destroy($id)
    {
        $post = Post::findOrFail($id);

        if ($post->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        if ($post->image && Storage::disk('public')->exists($post->image)) {
            Storage::disk('public')->delete($post->image);
        }


        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully'
        ], 200);
    }
}
