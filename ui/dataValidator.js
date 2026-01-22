function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
}

function sanitizeInput(input) {
    return input.replace(/[<>]/g, '');
}

function validateFormData(userData) {
    const errors = [];
    
    if (!validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePassword(userData.password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase and number');
    }
    
    if (userData.username) {
        userData.username = sanitizeInput(userData.username);
        if (userData.username.length < 3) {
            errors.push('Username must be at least 3 characters');
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        sanitizedData: userData
    };
}

export { validateEmail, validatePassword, sanitizeInput, validateFormData };