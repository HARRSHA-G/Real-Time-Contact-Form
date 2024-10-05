document.getElementById('applicationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Clear all previous error messages
    clearErrors();

    // Get the form values
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // First Name Validation
    if (!fname) {
        showError('fnameError', 'Please fill out the first name field.');
        isValid = false;
    }

    // Last Name Validation
    if (!lname) {
        showError('lnameError', 'Please fill out the last name field.');
        isValid = false;
    }

    // Email Validation
    if (!email) {
        showError('emailError', 'Please fill out the email field.');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address.');
        isValid = false;
    }

    // Phone Number Validation
    if (!phone) {
        showError('phoneError', 'Please fill out the phone number field.');
        isValid = false;
    } else if (!isValidPhone(phone)) {
        showError('phoneError', 'Please enter a valid 10-digit phone number.');
        isValid = false;
    }

    // If the form is valid, submit it
    if (isValid) {
        // Prepare form data
        const formData = new FormData();
        formData.append('access_key', 'a9270a16-90d9-407a-a9a5-211642400405');
        formData.append('fname', fname);
        formData.append('lname', lname);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('message', message);

        // Send form data to Web3Forms
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Display success message
                showSuccessMessage();
            } else {
                alert('There was an error submitting your form. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(function (errorElement) {
        errorElement.style.display = 'none';
    });
}

function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}

function isValidPhone(phone) {
    const phonePattern = /^[0-9]{10}$/; // Accepts 10-digit numbers only
    return phonePattern.test(phone);
}

function showSuccessMessage() {
    // Create success message element
    const successMessage = document.createElement('p');
    successMessage.textContent = 'Thank you! Your form has been submitted successfully.';
    successMessage.style.color = 'green';
    successMessage.style.fontSize = '1.2rem';
    successMessage.style.textAlign = 'center';

    // Insert the success message below the form
    const form = document.getElementById('applicationForm');
    form.style.display = 'none'; // Hide form after submission
    form.parentNode.appendChild(successMessage);
}
