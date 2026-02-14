<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class ManagePostController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->query('status');
        $search = trim($request->query('search', ''));
        $tag = $request->query('tag');
        $userID = $request->query('user_id');
        $term   = '%' . $search . '%';

        $posts = Post::with('user:id,name')
            ->withCount(['likes', 'comments'])
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($tag, fn($q) => $q->whereRelation('tags', 'name', $tag))
            ->when($userID, fn($q) => $q->whereRelation('user', 'id', $userID))
            ->when($search, function ($query) use ($term) {
                $query->where(function ($q) use ($term) {
                    $q->where('title', 'LIKE', $term)
                        ->orWhere('body', 'LIKE', $term)
                        ->orWhereHas('user', function ($userQuery) use ($term) {
                            $userQuery->where('name', 'LIKE', $term);
                        });
                });
            })
            ->latest('created_at')
            ->paginate(10, [
                'id',
                'title',
                'body',
                'image',
                'status',
                'user_id',
                'created_at',
                'slug'
            ]);
        return response()->json([
            'posts' => $posts
        ]);
    }



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

                $tag = Tag::firstOrCreate(['name' => $tagName]);
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
            'tags:id,name',
        ])
            ->where('slug', $slug)
            ->firstOrFail();


        return response()->json([
            'post' => $post
        ]);
    }
    public function postByTag($tag)
    {
        $posts = Post::with(['user:id,name', 'tags:id,name'])
            ->withCount(['likes', 'comments'])
            ->whereHas('tags', function ($q) use ($tag) {
                $q->where('name', $tag);
            })
            ->orderBy('likes_count', 'desc')
            ->paginate(10);

        return response()->json([
            'posts' => $posts
        ]);
    }

    public function update(Request $request, $id)
    {
        $attributes = $request->validate([
            'title' => ['required'],
            'body'  => ['required', 'min:10'],
            'status' => ['required'],
            'image' => ['sometimes', 'nullable', 'image'],
            'tags' => ['nullable', 'string']
        ]);

        $post = Post::findOrFail($id);
        /** @var \App\Models\User $user */
        $user = Auth::user();
        if (!$user->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($request->boolean('removeImage')) {
            if ($post->image && Storage::disk('public')->exists($post->image)) {
                Storage::disk('public')->delete($post->image);
            }
            $post->image = null;
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
    public function destroy(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        /** @var \App\Models\User $user */
        $user = Auth::user();
        if (!$user->isAdmin()) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }


        if ($post->image && Storage::disk('public')->exists($post->image)) {
            Storage::disk('public')->delete($post->image);
        }
        $post->image = null;

        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully'
        ], 200);
    }
}
