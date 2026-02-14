function validateRegistrationForm(email, password, confirmPassword) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    
    if (!emailRegex.test(email)) {
        return { isValid: false, message: "Invalid email format" };
    }
    
    if (!passwordRegex.test(password)) {
        return { 
            isValid: false, 
            message: "Password must be at least 8 characters with letters and numbers" 
        };
    }
    
    if (password !== confirmPassword) {
        return { isValid: false, message: "Passwords do not match" };
    }
    
    return { isValid: true, message: "Registration validation successful" };
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const validationResult = validateRegistrationForm(email, password, confirmPassword);
    
    const messageElement = document.getElementById('registrationMessage');
    messageElement.textContent = validationResult.message;
    messageElement.className = validationResult.isValid ? 'success' : 'error';
    
    if (validationResult.isValid) {
        console.log('Registration data valid, proceeding with submission...');
    }
}function validateRegistrationForm(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(email)) {
        return { isValid: false, message: "Invalid email format" };
    }

    if (!passwordRegex.test(password)) {
        return { 
            isValid: false, 
            message: "Password must be at least 8 characters with letters and numbers" 
        };
    }

    return { isValid: true, message: "Registration data is valid" };
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const validationResult = validateRegistrationForm(email, password);
    
    const messageElement = document.getElementById('message');
    if (validationResult.isValid) {
        messageElement.textContent = "Registration successful!";
        messageElement.className = "success";
        // Here you would typically send data to server
    } else {
        messageElement.textContent = validationResult.message;
        messageElement.className = "error";
    }
}

// Example usage when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('submit', handleRegistrationSubmit);
    }
});function validateRegistrationForm(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(email)) {
        return { isValid: false, message: "Invalid email format" };
    }

    if (!passwordRegex.test(password)) {
        return { isValid: false, message: "Password must be at least 8 characters long and contain both letters and numbers" };
    }

    return { isValid: true, message: "Registration data is valid" };
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    const validationResult = validateRegistrationForm(email, password);
    
    const resultElement = document.getElementById("result");
    resultElement.textContent = validationResult.message;
    
    if (validationResult.isValid) {
        resultElement.style.color = "green";
        console.log("Registration data:", { email, password });
    } else {
        resultElement.style.color = "red";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registrationForm");
    if (form) {
        form.addEventListener("submit", handleRegistrationSubmit);
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

function validateUserRegistration(userData) {
    const errors = [];
    
    if (!validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePassword(userData.password)) {
        errors.push('Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters');
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

function formatValidationResult(result) {
    if (result.isValid) {
        return 'Registration data is valid';
    } else {
        return `Validation errors:\n${result.errors.join('\n')}`;
    }
}

module.exports = {
    validateEmail,
    validatePassword,
    validateUserRegistration,
    formatValidationResult
};function validateRegistrationForm(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    if (!emailRegex.test(email)) {
        return { valid: false, message: "Invalid email format" };
    }
    
    if (!passwordRegex.test(password)) {
        return { 
            valid: false, 
            message: "Password must be at least 8 characters with letters and numbers" 
        };
    }
    
    return { valid: true, message: "Registration data is valid" };
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const validationResult = validateRegistrationForm(email, password);
    
    const resultElement = document.getElementById('registrationResult');
    resultElement.textContent = validationResult.message;
    resultElement.className = validationResult.valid ? 'success' : 'error';
    
    if (validationResult.valid) {
        console.log('Registration data valid, proceeding with submission...');
    }
}