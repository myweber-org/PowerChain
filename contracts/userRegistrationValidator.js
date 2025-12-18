function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    return true;
}

function validateRegistrationForm(userData) {
    const errors = {};
    
    if (!userData.username || userData.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters';
    }
    
    if (!validateEmail(userData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (!validatePassword(userData.password)) {
        errors.password = 'Password must be at least 8 characters with uppercase, lowercase and numbers';
    }
    
    if (userData.password !== userData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export { validateRegistrationForm, validateEmail, validatePassword };