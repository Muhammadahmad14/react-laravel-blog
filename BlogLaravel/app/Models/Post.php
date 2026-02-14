<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Comment;
use Laravel\Scout\Searchable;
use phpDocumentor\Reflection\Types\This;

class Post extends Model
{
    use HasFactory, Searchable;


    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'body',
        'image',
        'status',
    ];
    public function toSearchableArray()
    {
        return [
            'title' => $this->title,
            'body'  => $this->body,
            'slug'  => $this->slug,
            'tags' => $this->tags->pluck('name')->toArray(),
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }



    public function likes(): HasMany
    {
        return $this->hasMany(PostLike::class);
    }

    // likes count
    public function likeCount(): int
    {
        return $this->likes()->count();
    }


    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
