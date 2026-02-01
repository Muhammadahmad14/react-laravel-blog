<!DOCTYPE html>
<html>

<head>
    <title>Subscribe</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
</head>

<body>
    <div class="container mt-5">
        <h3>Welcome, {{ auth()->user()->name }}
            @if (auth()->user()->has_blue_tick)
                <i class="fas fa-check-circle text-primary"></i>
            @endif
        </h3>

        @if (!auth()->user()->has_blue_tick)
            <form method="POST" action="{{ route('subscribe.process') }}">
                @csrf
                <button class="btn btn-success mt-3">Subscribe</button>
            </form>
        @else
            <p class="text-success mt-3">You are subscribed!</p>
        @endif
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
