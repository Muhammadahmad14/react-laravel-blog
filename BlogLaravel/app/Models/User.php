<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Scout\Searchable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable, Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'google_id',
        'name',
        'email',
        'password',
        'role',
        'profile_img',
        'profile_pic_status',
        'has_blue_tick',
    ];

    public function toSearchableArray()
    {
        return [
            'name' => $this->name,
            'description'  => $this->description,
        ];
    }


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];



    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }


    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
    public function likes()
    {
        return $this->hasMany(PostLike::class);
    }

    // Check if user liked a specific post
    public function hasLiked($postId)
    {
        return $this->likes()
            ->where('post_id', $postId)
            ->exists();
    }

    public function like($postId)
    {
        return $this->likes()->create([
            'post_id' => $postId,
        ]);
    }

    public function unlike($postId)
    {
        return $this->likes()
            ->where('post_id', $postId)
            ->delete();
    }

    public function followers()
    {
        // Users who follow this user
        return $this->belongsToMany(User::class, 'followers', 'following_id', 'follower_id');
    }

    public function following()
    {
        // Users this user follows
        return $this->belongsToMany(User::class, 'followers', 'follower_id', 'following_id');
    }

    // public function checkStatus($id)
    // {

    //     $authFollowsUser = $this->following()
    //         ->where('following_id', $id)
    //         ->exists();

    //     $userFollowsAuth =  $this->followers()
    //         ->where('follower_id', $id)
    //         ->exists();

    //     return (
    //         [
    //             'auth_follows_user' => $authFollowsUser,
    //             'user_follows_auth' => $userFollowsAuth,
    //             'friends' => $authFollowsUser && $userFollowsAuth,
    //         ]
    //     );
    // }
}
