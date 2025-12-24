function validateForm() {
    const form = document.querySelector('form');
    const email = form.querySelector('#email');
    const password = form.querySelector('#password');
    const emailError = form.querySelector('#emailError');
    const passwordError = form.querySelector('#passwordError');
    let isValid = true;

    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
        isValid = false;
    }

    function clearError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }

    clearError(emailError);
    clearError(passwordError);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(emailError, 'Email is required');
    } else if (!emailRegex.test(email.value)) {
        showError(emailError, 'Please enter a valid email address');
    }

    if (!password.value.trim()) {
        showError(passwordError, 'Password is required');
    } else if (password.value.length < 8) {
        showError(passwordError, 'Password must be at least 8 characters long');
    }

    if (isValid) {
        form.submit();
    }

    return false;
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            validateForm();
        });

        const email = form.querySelector('#email');
        const password = form.querySelector('#password');
        const emailError = form.querySelector('#emailError');
        const passwordError = form.querySelector('#passwordError');

        email.addEventListener('input', function() {
            if (email.value.trim()) {
                clearError(emailError);
            }
        });

        password.addEventListener('input', function() {
            if (password.value.trim() && password.value.length >= 8) {
                clearError(passwordError);
            }
        });
    }
});