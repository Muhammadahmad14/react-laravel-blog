<form action="{{ route('search') }}" method="GET">
    <input type="text" name="query" placeholder="Search posts or users..." value="{{ request('query') }}" required>
    <button type="submit">Search</button>
</form>
