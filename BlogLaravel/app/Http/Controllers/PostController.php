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
            'user:id,name,profile_img,has_blue_tick',
            'comments.user:id,name,profile_img',
            'tags:id,name'
        ])
            ->where('status', 'published')
            ->withCount(['likes', 'comments'])
            ->withExists([
                'likes as liked_by_user' => function ($q) {
                    $q->where('user_id', Auth::id());
                }
            ])

            ->latest()
            ->paginate(5, ['id', 'title', 'body', 'image', 'user_id', 'created_at']);

        return response()->json($posts, 200);
    }

    public function getUserPosts($id)
    {
        $posts = Post::with([
            'user:id,name,profile_img,has_blue_tick',
            'comments.user:id,name,profile_img',
            'tags:id,name'
        ])
            ->where('user_id', $id)
            ->withCount(['likes', 'comments'])
            ->withExists([
                'likes as liked_by_user' => function ($q) {
                    $q->where('user_id', Auth::id());
                }
            ])
            ->latest()
            ->paginate(5, ['id', 'title', 'body', 'image', 'user_id', 'created_at']);

        return response()->json($posts, 200);
    }

    public function getTagPosts($tag)
    {
        $posts = Post::with([
            'user:id,name,profile_img',
            'comments.user:id,name,profile_img',
            'tags:id,name'
        ])
            ->withCount(['likes', 'comments'])
            ->withExists([
                'likes as liked_by_user' => function ($query) {
                    $query->where('user_id', Auth::id());
                }
            ])
            ->whereHas('tags', function ($query) use ($tag) {
                $query->where('name', $tag);
            })->latest()
            ->paginate(5, ['id', 'title', 'body', 'image', 'user_id', 'created_at']);

        return response()->json($posts, 200);
    }

    // add
    public function store(Request $request)
    {
        $attributes = $request->validate([
            'title' => ['required'],
            'body'  => ['required'],
            'image' => ['nullable', 'image'],
            'tags' => ['nullable', 'string']
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('posts', 'public');
            $attributes['image'] = $path;
        }

        $attributes['user_id'] = Auth::id();
        $attributes['slug'] = Str::slug($attributes['title'] . '-' . time());
        $post = Post::create($attributes);

        $tagIds = [];
        if ($request->has('tags')) {
            $tagsInput = $request->input('tags');

            if (is_string($tagsInput)) {
                $tagsArray = preg_split('/[, ]+/', $tagsInput, -1, PREG_SPLIT_NO_EMPTY);
            } elseif (is_array($tagsInput)) {
                $tagsArray = $tagsInput;
            } else {
                $tagsArray = [];
            }

            foreach ($tagsArray as $tagName) {
                $tagName = trim($tagName);
                if ($tagName === '') continue;

                $tag = Tag::firstOrCreate(
                    ['name' => $tagName],          
                    ['user_id' => Auth::id()] 
                );
                $tagIds[] = $tag->id;
            }
        }

        if (!empty($tagIds)) {
            $post->tags()->attach($tagIds);
        }

        return response()->json([
            'message' => 'Post created successfully',
        ], 201);
    }


    public function show($slug)
    {
        $post = Post::with([
            'user:id,name,profile_img',
            'comments.user:id,name,profile_img',
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
            'body'  => ['required'],
            'image' => ['sometimes', 'nullable', 'image'],
            'tags' => ['nullable', 'string']
        ]);

        $post = Post::findOrFail($id);

        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($request->boolean('removeImage')) {
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
        if ($request->has('tags')) {
            $tagsInput = $request->input('tags');
            if (is_string($tagsInput)) {
                $tagsArray = preg_split('/[, ]+/', $tagsInput, -1, PREG_SPLIT_NO_EMPTY);
            } elseif (is_array($tagsInput)) {
                $tagsArray = $tagsInput;
            } else {
                $tagsArray = [];
            }

            foreach ($tagsArray as $tagName) {
                $tagName = trim($tagName);
                if ($tagName === '') continue;
                $tag = Tag::firstOrCreate(['name' => $tagName]);
                $tagIds[] = $tag->id;
            }
        }
        if (!empty($tagIds)) {
            $post->tags()->sync($tagIds);
        } else {
            $post->tags()->detach();
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
