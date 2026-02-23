function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    return input.trim()
        .replace(/[<>]/g, '')
        .substring(0, 255);
}

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

module.exports = { sanitizeInput, validateEmail, validatePassword };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

function validateUserInput(email, password) {
    const errors = [];
    
    if (!validateEmail(email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePassword(password)) {
        errors.push('Password must be at least 8 characters with one uppercase letter and one number');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateUserInput };