<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class ManagePostController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->query('status');
        $posts = Post::with('user:id,name')
            ->withCount(['likes', 'comments'])
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate(10, ['id', 'title', 'body', 'image', 'user_id', 'created_at']);

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
            'user:id,name',
            'tags:id,name',
        ])
            ->withCount(['likes', 'comments'])
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

    public function yearlyPosts()
    {
        $year = now()->year;
        $posts = Post::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as total')
        )
            ->whereYear('created_at', $year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $monthlyData = array_fill(1, 12, 0);
        foreach ($posts as $post) {
            $monthlyData[$post->month] = $post->total;
        }
        return response()->json([
            'year' => $year,
            'data' => array_values($monthlyData),
        ]);
    }
    public function searchPosts($query)
    {
        $query = trim($query);

        $posts = Post::select('posts.*', DB::raw("MATCH(title, body) AGAINST(? IN NATURAL LANGUAGE MODE) AS relevance", [$query]))
            ->whereFullText(['title', 'body'], $query)
            ->with('user:id,name')
            ->orderByDesc('relevance')
            ->paginate(10, ['id', 'title', 'body', 'image', 'user_id', 'created_at']);

        return response()->json([
            'posts' => $posts,
        ]);
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


        if ($request->boolean('removeImage')) {
            if ($post->image && Storage::disk('public')->exists($post->image)) {
                Storage::disk('public')->delete($post->image);
            }
            $post->image = null;
        }


        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully'
        ], 200);
    }
}
