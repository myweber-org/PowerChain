function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (!passwordPattern.test(password)) {
        alert('Password must be at least 8 characters long and contain both letters and numbers.');
        return false;
    }

    return true;
}function validateForm(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    let isValid = true;
    
    emailError.textContent = '';
    passwordError.textContent = '';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long';
        isValid = false;
    }
    
    if (isValid) {
        console.log('Form submitted successfully');
        document.getElementById('loginForm').submit();
    }
}

document.getElementById('loginForm').addEventListener('submit', validateForm);function validateForm() {
    const form = document.getElementById('userForm');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const errorContainer = document.getElementById('errorMessages');
    
    errorContainer.innerHTML = '';
    let isValid = true;
    
    if (!email.value.includes('@')) {
        displayError('Please enter a valid email address');
        isValid = false;
    }
    
    if (password.value.length < 8) {
        displayError('Password must be at least 8 characters long');
        isValid = false;
    }
    
    if (!/\d/.test(password.value)) {
        displayError('Password must contain at least one number');
        isValid = false;
    }
    
    if (isValid) {
        form.classList.add('valid');
        return true;
    } else {
        form.classList.add('invalid');
        return false;
    }
    
    function displayError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorContainer.appendChild(errorElement);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            if (!validateForm()) {
                event.preventDefault();
            }
        });
        
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', validateForm);
            input.addEventListener('input', function() {
                this.parentElement.classList.remove('error');
            });
        });
    }
});