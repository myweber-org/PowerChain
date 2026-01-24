function validateEmail(email) {
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

function validateRegistrationData(userData) {
    const errors = [];
    
    if (!userData.username || userData.username.trim().length < 3) {
        errors.push('Username must be at least 3 characters long');
    }
    
    if (!validateEmail(userData.email)) {
        errors.push('Please enter a valid email address');
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

module.exports = { validateRegistrationData, validateEmail, validatePassword };function validateRegistrationForm(formData) {
    const errors = {};
    
    if (!formData.username || formData.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters long';
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password || formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    }
    
    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.age && (formData.age < 13 || formData.age > 120)) {
        errors.age = 'Age must be between 13 and 120';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) {
        return { valid: false, message: "Password must be at least 8 characters long" };
    }
    
    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: "Password must contain at least one uppercase letter" };
    }
    
    if (!/[a-z]/.test(password)) {
        return { valid: false, message: "Password must contain at least one lowercase letter" };
    }
    
    if (!/\d/.test(password)) {
        return { valid: false, message: "Password must contain at least one number" };
    }
    
    if (!/[!@#$%^&*]/.test(password)) {
        return { valid: false, message: "Password must contain at least one special character" };
    }
    
    return { valid: true, message: "Password is strong" };
}

function validateUsername(username) {
    if (username.length < 3) {
        return { valid: false, message: "Username must be at least 3 characters long" };
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return { valid: false, message: "Username can only contain letters, numbers, and underscores" };
    }
    
    return { valid: true, message: "Username is valid" };
}

function validateRegistration(userData) {
    const errors = [];
    
    if (!validateEmail(userData.email)) {
        errors.push("Invalid email format");
    }
    
    const passwordValidation = validatePassword(userData.password);
    if (!passwordValidation.valid) {
        errors.push(passwordValidation.message);
    }
    
    const usernameValidation = validateUsername(userData.username);
    if (!usernameValidation.valid) {
        errors.push(usernameValidation.message);
    }
    
    if (userData.password !== userData.confirmPassword) {
        errors.push("Passwords do not match");
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = { validateRegistration, validateEmail, validatePassword, validateUsername };