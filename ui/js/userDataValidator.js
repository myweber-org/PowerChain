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

function validateUserData(userData) {
    const errors = [];
    
    if (!userData.email || !validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!userData.password || !validatePassword(userData.password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase and numbers');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateEmail, validatePassword, validateUserData };