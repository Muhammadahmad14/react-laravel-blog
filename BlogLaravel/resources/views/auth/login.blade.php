<!DOCTYPE html>
<html>

<head>
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">

    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card shadow">
                    <div class="card-body">
                        <h4 class="text-center mb-4">Login</h4>

                        @if ($errors->any())
                            <div class="alert alert-danger">
                                {{ $errors->first() }}
                            </div>
                        @endif

                        <form method="POST" action="{{ route('login.submit') }}">
                            @csrf

                            <div class="mb-3">
                                <label>Email</label>
                                <input type="email" name="email" class="form-control" required>
                            </div>

                            <div class="mb-3">
                                <label>Password</label>
                                <input type="password" name="password" class="form-control" required>
                            </div>

                            <button class="btn btn-primary w-100">Login</button>
                        </form>
                        <div class="text-center mt-3">
                            <a href="{{ route('register') }}">Create new account</a>
                        </div>
                        <a href="{{ route('auth.google') }}"
                            class="btn btn-outline-danger btn-lg w-100 d-flex align-items-center justify-content-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                viewBox="0 0 16 16">
                                <path
                                    d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 5.305-3.55 9.082-8.846 9.082A8.682 8.682 0 0 1 0 8.682 8.682 8.682 0 0 1 6.838 0c1.846 0 3.385.666 4.58 1.758L9.54 3.636C7.57 1.783 4.154 3.17 4.154 6.682c0 2.135 1.714 3.846 3.846 3.846 2.462 0 3.385-1.77 3.527-2.682H6.838V6.558h8.707z" />
                            </svg>
                            Continue with Google
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>

</html>
