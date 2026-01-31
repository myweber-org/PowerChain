function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateUsername(username) {
    return username.length >= 3 && username.length <= 20;
}

function validatePassword(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    
    return password.length >= 8 && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
}

function validateProfileForm(userData) {
    const errors = {};
    
    if (!validateEmail(userData.email)) {
        errors.email = 'Invalid email format';
    }
    
    if (!validateUsername(userData.username)) {
        errors.username = 'Username must be between 3 and 20 characters';
    }
    
    if (!validatePassword(userData.password)) {
        errors.password = 'Password must be at least 8 characters with uppercase, lowercase, number and special character';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

module.exports = { validateProfileForm };function validateUserProfile(profile) {
    const { email, age } = profile;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    const isValidAge = age >= 18 && age <= 120;
    
    if (!isValidEmail) {
        return { valid: false, error: 'Invalid email format' };
    }
    
    if (!isValidAge) {
        return { valid: false, error: 'Age must be between 18 and 120' };
    }
    
    return { valid: true, error: null };
}