<h2>Search results for "{{ $query }}"</h2>

<h3>Users</h3>
@if($users->count())
    <ul>
        @foreach($users as $user)
            <li>{{ $user->name }} ({{ $user->email }})</li>
        @endforeach
    </ul>
@else
    <p>No users found.</p>
@endif

<h3>Posts</h3>
@if($posts->count())
    <ul>
        @foreach($posts as $post)
            <li>{{ $post->title }} - {{ Str::limit($post->body, 50) }}</li>
        @endforeach
    </ul>
@else
    <p>No posts found.</p>
@endif
