<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Friend;
use App\Models\Post;
use App\Models\PostLike;
use App\Models\PostTag;
use App\Models\Tag;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
{
    // Create users
    $users = User::factory(10)->create();

    // Create posts for users
    $posts = Post::factory(10)->recycle($users)->create();

    // Create tags
    $tags = Tag::factory(10)->create();

    // Attach tags to posts
    foreach ($posts as $post) {
        $post->tags()->attach(
            $tags->random(rand(1, 3))->pluck('id')->toArray()
        );
    }

    // Create comments for posts by users
   

    // Create likes for posts by users
   

    // Create friendships
   
}

}
