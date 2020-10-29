// Create and initialize a payment form object
const paymentForm = new SqPaymentForm({
// Initialize the payment form elements


applicationId: "sandbox-sq0idb-48WJfMHZS8qqO3i-DSY1tg",
inputClass: 'sq-input',
autoBuild: false,
// Customize the CSS for SqPaymentForm iframe elements
inputStyles: [{
    fontSize: '16px',
    lineHeight: '24px',
    padding: '16px',
    placeholderColor: '#a0a0a0',
    backgroundColor: 'transparent',
}],
// Initialize the credit card placeholders
cardNumber: {
    elementId: 'sq-card-number',
    placeholder: 'Card Number'
},
cvv: {
    elementId: 'sq-cvv',
    placeholder: 'CVV'
},
expirationDate: {
    elementId: 'sq-expiration-date',
    placeholder: 'MM/YY'
},
postalCode: {
    elementId: 'sq-postal-code',
    placeholder: 'Postal'
},
// SqPaymentForm callback functions
callbacks: {
    /*
    * callback function: cardNonceResponseReceived
    * Triggered when: SqPaymentForm completes a card nonce request
    */
    cardNonceResponseReceived: function (errors, nonce, cardData) {
    if (errors) {
        // Log errors from nonce generation to the browser developer console.
        console.error('Encountered errors:');
        errors.forEach(function (error) {
            console.error('  ' + error.message);
        });
        alert('Encountered errors, check browser developer console for more details');
        return;
    }
        alert(`The generated nonce is:\n${nonce}`);
        
        fetch('process-payment', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nonce: nonce
        })
        })
        .catch(err => {
        alert('Network error: ' + err);
        })
        .then(response => {
        if (!response.ok) {
            return response.json().then(errorInfo => Promise.reject(errorInfo)); //UPDATE HERE
        }
        return response.json(); //UPDATE HERE
        })
        .then(data => {
        console.log(data); //UPDATE HERE
        alert('Payment complete successfully!\nCheck browser developer console for more details');
        })
        .catch(err => {
        console.error(err);
        alert('Payment failed to complete!\nCheck browser developer console for more details');
        });
    }
}
});

paymentForm.build();

// onGetCardNonce is triggered when the "Pay $1.00" button is clicked
function onGetCardNonce(event) {
    // Don't submit the form until SqPaymentForm returns with a nonce
    event.preventDefault();
    // Request a nonce from the SqPaymentForm object
    paymentForm.requestCardNonce();
}