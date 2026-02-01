<!DOCTYPE html>
<html>

<head>
    <title>Dashboard</title>

    <!-- Font Awesome with CORRECT integrity hash -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>

    <nav class="navbar navbar-dark bg-dark px-3">
        <span class="navbar-brand">Dashboard</span>

        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button class="btn btn-danger btn-sm">Logout</button>
        </form>
    </nav>

    <div class="container mt-5">
        <h3>Welcome, {{ auth()->user()->name }}
            @if (auth()->user()->has_blue_tick)
                <span class="badge rounded-circle p-2 ms-2" style="background-color: #1DA1F2;">
                    <i class="fa-solid fa-check text-white"></i>
                </span>
            @endif
        </h3>

        <p>You are logged in using Sanctum session authentication.</p>
    </div>

    <!-- Toast container -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
        @if (session('success'))
            <div id="successToast" class="toast align-items-center text-bg-success border-0" role="alert"
                aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        {{ session('success') }}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                        aria-label="Close"></button>
                </div>
            </div>
        @endif
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        window.addEventListener('DOMContentLoaded', (event) => {
            const toastEl = document.getElementById('successToast');
            if (toastEl) {
                const toast = new bootstrap.Toast(toastEl);
                toast.show();
            }
        });
    </script>

</body>

</html>
