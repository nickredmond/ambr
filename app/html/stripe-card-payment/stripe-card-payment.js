// todo: 
// 1. pass "currentUserId" as saved charge token and ask "use existing card" IF IT EXISTS
// 2. add loading view to new "payment" page while charge token is being fetched
// 3. show card form IFF existing card doesn't exist or user inputs "provide card details"
// 4. get token back, parse token ID, and then send it to server for payment onPaymentSubmit
// BACKEND ADDITIONS: user lambda to get charge token (need to design user stuff), lambda to charge card using Stripe server code

var URL_PARAMETERS = {};
var isAddingNewCard = false;
var stripe = null;
var card = null;

var hasDecimalPlace = function(value, x) {
    var pointIndex = value.indexOf('.');
    return  pointIndex >= 0 && pointIndex < value.length - x;
};

var loadUrlParams = function() {
    var currentUrl = window.location.href;
    var queryString = currentUrl.split("?")[1];
    var allParameters = queryString.split("&");
    
    allParameters.forEach((parameter) => {
        var parameterTokens = parameter.split("=");
        URL_PARAMETERS[parameterTokens[0]] = parameterTokens[1];
    })
};

var getCurrentUserId = function() {
    return URL_PARAMETERS["currentUserId"];
};
var getPaymentMethods = function() {
    var paymentMethodsString = decodeURI(URL_PARAMETERS["paymentMethods"]);
    return JSON.parse(paymentMethodsString);
}

var populatePaymentMethods = function(paymentMethods) {
    var paymentSourceSelect = document.getElementById("payment-source-select");
    paymentMethods.forEach((paymentMethod) => {
        var option = document.createElement("option");
        option.value = paymentMethod.tokenId;
        option.innerText = paymentMethod.cardBrand + " ***" + paymentMethod.lastFourDigits;
        paymentSourceSelect.appendChild(option);
    });
}
 
 // Handle form submission.
 document.addEventListener("DOMContentLoaded", function(event) {
    loadUrlParams();
    var paymentMethods = getPaymentMethods();
    if (paymentMethods && paymentMethods.length > 0) {
        populatePaymentMethods(paymentMethods);
    }

    $("select").material_select();

    $('#payment-amount').keypress(function (e) {
        var character = String.fromCharCode(e.keyCode)
        var newValue = this.value + character;
        if (isNaN(newValue) || hasDecimalPlace(newValue, 3)) {
            e.preventDefault();
            return false;
        }
    });

    $("#payment-source-select").change(function() {
        if ($(this).val() === "newCard") {
            isAddingNewCard = true;
            document.getElementById("payment-form").style.display = "block";
        }
        else {
            document.getElementById("payment-form").style.display = "none";
        }
        document.getElementById("payment-input-container").style.display = "block";
    });

    // Create a Stripe client.
    stripe = Stripe('pk_test_8qrPJob9OiAa3zsnV5wN9raM');

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
    card = elements.create('card', {style: style});

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
});

var trySubmitPayment = function() {
    var paymentAmountInput = document.getElementById("payment-amount");
    var donationErrorLabel = document.getElementById("missingDonationAmountLabel");
    var donationAmount = paymentAmountInput.value;
    if (!donationAmount) {
        paymentAmountInput.classList.add("invalid");
        paymentAmountInput.setAttribute("aria-invalid", "true");
        donationErrorLabel.style.display = "block";
    }
    else {
        paymentAmountInput.classList.remove("invalid");
        paymentAmountInput.removeAttribute("aria-invalid");
        donationErrorLabel.style.display = "none";
    }
}

// todo: before doing ANYTHING, validate form i.e. validate donate amount exists
var onDonateClick =  function() {
    if (isAddingNewCard) {
        stripe.createToken(card).then(function(result) {
            if (result.error) {
                // Inform the user if there was an error.
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            } else {
                // Send the token to your server.
                document.getElementById("thetoken").innerText = JSON.stringify(result.token);
                trySubmitPayment();
            }
        });
    }
    else {
        trySubmitPayment();
    }
};