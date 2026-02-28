function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && 
           hasUpperCase && 
           hasLowerCase && 
           hasNumbers && 
           hasSpecialChar;
}

function validateRegistration(userData) {
    const errors = [];
    
    if (!validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePassword(userData.password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase, number and special character');
    }
    
    if (userData.password !== userData.confirmPassword) {
        errors.push('Passwords do not match');
    }
    
    if (userData.age && (userData.age < 13 || userData.age > 120)) {
        errors.push('Age must be between 13 and 120');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    
    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value,
        age: parseInt(document.getElementById('age').value) || 0
    };
    
    const validationResult = validateRegistration(formData);
    
    if (validationResult.isValid) {
        console.log('Registration successful');
        return true;
    } else {
        console.log('Validation errors:', validationResult.errors);
        return false;
    }
}function validateRegistrationForm(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    if (!emailRegex.test(email)) {
        return { valid: false, message: "Invalid email format" };
    }
    
    if (!passwordRegex.test(password)) {
        return { valid: false, message: "Password must be at least 8 characters with letters and numbers" };
    }
    
    return { valid: true, message: "Registration data is valid" };
}function validateRegistrationForm(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    
    if (!emailRegex.test(email)) {
        return { valid: false, message: "Invalid email format" };
    }
    
    if (!passwordRegex.test(password)) {
        return { valid: false, message: "Password must be at least 8 characters with letters and numbers" };
    }
    
    return { valid: true, message: "Registration data is valid" };
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    
    const validationResult = validateRegistrationForm(email, password);
    
    const resultElement = document.getElementById('validationResult');
    resultElement.textContent = validationResult.message;
    resultElement.className = validationResult.valid ? 'success' : 'error';
    
    if (validationResult.valid) {
        console.log('Registration data validated successfully');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('submit', handleRegistrationSubmit);
    }
});function validateRegistrationForm(email, password, confirmPassword) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!email || !password || !confirmPassword) {
        return { valid: false, message: "All fields are required" };
    }

    if (!emailRegex.test(email)) {
        return { valid: false, message: "Invalid email format" };
    }

    if (!passwordRegex.test(password)) {
        return { valid: false, message: "Password must be at least 8 characters long and contain both letters and numbers" };
    }

    if (password !== confirmPassword) {
        return { valid: false, message: "Passwords do not match" };
    }

    return { valid: true, message: "Registration data is valid" };
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const validationResult = validateRegistrationForm(email, password, confirmPassword);
    
    const resultElement = document.getElementById('registrationResult');
    resultElement.textContent = validationResult.message;
    resultElement.className = validationResult.valid ? 'success' : 'error';
    
    if (validationResult.valid) {
        console.log('Registration data is valid. Proceeding with submission...');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
    }
});