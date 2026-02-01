<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Payment</title>

    <!-- Bootstrap CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">

    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">

                <div class="card shadow-sm">
                    <div class="card-header text-center fw-bold">
                        Order Summary
                    </div>

                    <div class="card-body">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td>Product 1</td>
                                    <td class="text-end">$10</td>
                                </tr>
                                <tr>
                                    <td>Product 2</td>
                                    <td class="text-end">$20</td>
                                </tr>
                                <tr>
                                    <td>Product 3</td>
                                    <td class="text-end">$15</td>
                                </tr>
                                <tr class="fw-bold border-top">
                                    <td>Total</td>
                                    <td class="text-end">$45</td>
                                </tr>
                            </tbody>
                        </table>

                        <form method="POST" action="{{ route('stripe.payment') }}" id="stripe_form">
                            @csrf
                            <input type="hidden" name="price" value="200">
                            <input type="hidden" name="stripe_token" id="stripe_token">
                            <div id="card-element" class="form-control mb-3"></div>

                            <button type="button" class="btn btn-primary w-100" onclick="createToken()">
                                Pay Now
                            </button>
                        </form>

                    </div>

                </div>

            </div>
        </div>
    </div>

</body>
<script src="https://js.stripe.com/v3/"></script>

<script>
    const stripe = Stripe("{{ env('STRIPE_KEY') }}");

    const elements = stripe.elements();
    const cardElement = elements.create('card');

    cardElement.mount('#card-element');

    function createToken() {
        stripe.createToken(cardElement).then(function(result) {
            console.log(result);
            if (result.token) {
                document.getElementById('stripe_token').value = result.token.id;
                document.getElementById('stripe_form').submit();
            }
        });

    }
</script>


</html>
