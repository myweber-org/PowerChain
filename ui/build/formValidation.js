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
}function validateForm() {
    const form = document.getElementById('registrationForm');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmError = document.getElementById('confirmError');
    
    let isValid = true;
    
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
        isValid = false;
    }
    
    function hideError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }
    
    hideError(emailError);
    hideError(passwordError);
    hideError(confirmError);
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showError(emailError, 'Please enter a valid email address');
    }
    
    if (password.value.length < 8) {
        showError(passwordError, 'Password must be at least 8 characters long');
    } else if (!/[A-Z]/.test(password.value)) {
        showError(passwordError, 'Password must contain at least one uppercase letter');
    } else if (!/[0-9]/.test(password.value)) {
        showError(passwordError, 'Password must contain at least one number');
    }
    
    if (password.value !== confirmPassword.value) {
        showError(confirmError, 'Passwords do not match');
    }
    
    if (isValid) {
        form.submit();
    }
    
    return false;
}

function setupRealTimeValidation() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    email.addEventListener('input', validateEmail);
    password.addEventListener('input', validatePassword);
    confirmPassword.addEventListener('input', validatePasswordMatch);
    
    function validateEmail() {
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email.value === '') {
            emailError.textContent = '';
            emailError.style.display = 'none';
        } else if (!emailRegex.test(email.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
        } else {
            emailError.textContent = '';
            emailError.style.display = 'none';
        }
    }
    
    function validatePassword() {
        const passwordError = document.getElementById('passwordError');
        
        if (password.value === '') {
            passwordError.textContent = '';
            passwordError.style.display = 'none';
            return;
        }
        
        if (password.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters long';
            passwordError.style.display = 'block';
        } else if (!/[A-Z]/.test(password.value)) {
            passwordError.textContent = 'Password must contain at least one uppercase letter';
            passwordError.style.display = 'block';
        } else if (!/[0-9]/.test(password.value)) {
            passwordError.textContent = 'Password must contain at least one number';
            passwordError.style.display = 'block';
        } else {
            passwordError.textContent = '';
            passwordError.style.display = 'none';
        }
    }
    
    function validatePasswordMatch() {
        const confirmError = document.getElementById('confirmError');
        
        if (confirmPassword.value === '') {
            confirmError.textContent = '';
            confirmError.style.display = 'none';
            return;
        }
        
        if (password.value !== confirmPassword.value) {
            confirmError.textContent = 'Passwords do not match';
            confirmError.style.display = 'block';
        } else {
            confirmError.textContent = '';
            confirmError.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            validateForm();
        });
        setupRealTimeValidation();
    }
});function validateForm() {
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

    return true;
}function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    let isValid = true;

    emailError.textContent = '';
    passwordError.textContent = '';
    document.getElementById('email').classList.remove('error');
    document.getElementById('password').classList.remove('error');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        document.getElementById('email').classList.add('error');
        isValid = false;
    }

    if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
        document.getElementById('password').classList.add('error');
        isValid = false;
    }

    return isValid;
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    if (!validateForm()) {
        event.preventDefault();
    }
});function validateForm() {
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
    
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return false;
    }
    
    return true;
}function validateForm() {
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
});