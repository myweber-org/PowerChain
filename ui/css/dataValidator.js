function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function sanitizeInput(input) {
    return input.trim()
        .replace(/[<>]/g, '')
        .substring(0, 255);
}

module.exports = {
    validateEmail,
    validatePhone,
    sanitizeInput
};function validateEmail(email) {
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
    return input.trim()
                .replace(/[<>]/g, '')
                .substring(0, 255);
}

function validateUserData(userData) {
    const errors = [];
    
    if (!validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePassword(userData.password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase and number');
    }
    
    if (userData.username) {
        const sanitizedUsername = sanitizeInput(userData.username);
        if (sanitizedUsername.length < 3) {
            errors.push('Username must be at least 3 characters');
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        sanitizedData: {
            email: userData.email.toLowerCase(),
            username: userData.username ? sanitizeInput(userData.username) : '',
            password: userData.password
        }
    };
}

export { validateEmail, validatePassword, sanitizeInput, validateUserData };