function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return false;
    }
    
    return true;
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    if (!validateForm()) {
        event.preventDefault();
    }
});function validateForm() {
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
}function validateForm() {
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

    alert('Form submitted successfully!');
    return true;
}function validateForm() {
    const form = document.getElementById('userForm');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const errorContainer = document.getElementById('errorMessages');
    
    errorContainer.innerHTML = '';
    let isValid = true;
    
    if (!email.value.includes('@')) {
        displayError('Please enter a valid email address');
        email.classList.add('invalid');
        isValid = false;
    } else {
        email.classList.remove('invalid');
    }
    
    if (password.value.length < 8) {
        displayError('Password must be at least 8 characters long');
        password.classList.add('invalid');
        isValid = false;
    } else {
        password.classList.remove('invalid');
    }
    
    function displayError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorContainer.appendChild(errorElement);
    }
    
    if (isValid) {
        form.submit();
    }
    
    return false;
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            validateForm();
        });
    }
});