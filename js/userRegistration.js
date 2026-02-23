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
    
    const resultElement = document.getElementById('registrationResult');
    resultElement.textContent = validationResult.message;
    resultElement.className = validationResult.valid ? 'success' : 'error';
    
    if (validationResult.valid) {
        console.log('Registration data submitted:', { email: email });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
    }
});function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

function validateRegistrationForm(email, password, confirmPassword) {
    const errors = [];

    if (!validateEmail(email)) {
        errors.push('Invalid email format');
    }

    if (!validatePassword(password)) {
        errors.push('Password must be at least 8 characters long');
    }

    if (password !== confirmPassword) {
        errors.push('Passwords do not match');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const validationResult = validateRegistrationForm(email, password, confirmPassword);

    if (validationResult.isValid) {
        console.log('Registration successful');
    } else {
        console.log('Registration failed:', validationResult.errors);
    }
}function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
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

function formatUserData(rawData) {
    return {
        email: rawData.email.trim().toLowerCase(),
        password: rawData.password,
        confirmPassword: rawData.confirmPassword,
        age: parseInt(rawData.age) || null,
        registrationDate: new Date().toISOString()
    };
}

function registerUser(userInput) {
    const formattedData = formatUserData(userInput);
    const validationResult = validateRegistration(formattedData);
    
    if (!validationResult.isValid) {
        return {
            success: false,
            message: 'Registration failed',
            errors: validationResult.errors
        };
    }
    
    // Simulate database save
    const userRecord = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        email: formattedData.email,
        age: formattedData.age,
        registeredAt: formattedData.registrationDate,
        status: 'active'
    };
    
    return {
        success: true,
        message: 'User registered successfully',
        data: userRecord
    };
}

// Example usage simulation
const sampleUser = {
    email: 'test@example.com',
    password: 'SecurePass123!',
    confirmPassword: 'SecurePass123!',
    age: '25'
};

const result = registerUser(sampleUser);
console.log(result);function validateRegistrationForm(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    
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
    
    const resultElement = document.getElementById('result');
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

function validateRegistrationForm(email, password, confirmPassword) {
    const errors = [];
    
    if (!validateEmail(email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePassword(password)) {
        errors.push('Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters');
    }
    
    if (password !== confirmPassword) {
        errors.push('Passwords do not match');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const validationResult = validateRegistrationForm(email, password, confirmPassword);
    
    if (validationResult.isValid) {
        console.log('Registration successful');
        return true;
    } else {
        console.log('Registration failed:', validationResult.errors);
        return false;
    }
}