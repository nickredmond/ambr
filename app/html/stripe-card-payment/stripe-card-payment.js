// todo: 
// 1. pass "currentUserId" as saved charge token and ask "use existing card" IF IT EXISTS
// 2. add loading view to new "payment" page while charge token is being fetched
// 3. show card form IFF existing card doesn't exist or user inputs "provide card details"
// 4. get token back, parse token ID, and then send it to server for payment onPaymentSubmit
// BACKEND ADDITIONS: user lambda to get charge token (need to design user stuff), lambda to charge card using Stripe server code

var getCurrentUserId = function() {
    var currentUrl = window.location.href;
    var queryString = currentUrl.split("?")[1];
    var allParameters = queryString.split("&");
    var currentUserIdParameter = allParameters.find((param) => {
        return param.startsWith("currentUserId=");
    });
    
    var currentUserId = currentUserIdParameter.split("=")[1];
    return currentUserId;
};
 
 // Handle form submission.
 document.addEventListener("DOMContentLoaded", function(event) {
    var currentUserId = getCurrentUserId();
    document.getElementById("thetoken").innerText = "user:" + currentUserId;

    // Create a Stripe client.
    var stripe = Stripe('pk_test_8qrPJob9OiAa3zsnV5wN9raM');

    // Create an instance of Elements.
    var elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
        base: {
            color: '#32325d',
            lineHeight: '18px',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
            color: '#aab7c4'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    };

    // Create an instance of the card Element.
    var card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        stripe.createToken(card).then(function(result) {
            if (result.error) {
            // Inform the user if there was an error.
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
            } else {
                // Send the token to your server.
                document.getElementById("thetoken").innerText = JSON.stringify(result.token);
            }
        });
    });
});