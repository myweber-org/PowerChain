function validateRegistrationForm(email, password) {
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
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const validationResult = validateRegistrationForm(email, password);
    
    const resultElement = document.getElementById('result');
    if (validationResult.valid) {
        resultElement.textContent = "Registration successful!";
        resultElement.style.color = "green";
    } else {
        resultElement.textContent = validationResult.message;
        resultElement.style.color = "red";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('submit', handleRegistrationSubmit);
    }
});function validateEmail(email) {
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

function validateRegistrationForm(userData) {
    const errors = [];
    
    if (!userData.username || userData.username.trim().length < 3) {
        errors.push("Username must be at least 3 characters long");
    }
    
    if (!validateEmail(userData.email)) {
        errors.push("Please enter a valid email address");
    }
    
    if (!validatePassword(userData.password)) {
        errors.push("Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters");
    }
    
    if (userData.password !== userData.confirmPassword) {
        errors.push("Passwords do not match");
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    
    const formData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value
    };
    
    const validationResult = validateRegistrationForm(formData);
    
    if (validationResult.isValid) {
        console.log("Registration successful!");
        return true;
    } else {
        console.log("Registration errors:", validationResult.errors);
        return false;
    }
}