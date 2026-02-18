
function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    
    const trimmed = input.trim();
    const sanitized = trimmed
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .replace(/\s+/g, ' ');
    
    return sanitized.substring(0, 500);
}

function validateEmail(email) {
    const sanitizedEmail = sanitizeInput(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(sanitizedEmail);
}

function validatePassword(password) {
    const sanitizedPassword = sanitizeInput(password);
    if (sanitizedPassword.length < 8) {
        return false;
    }
    
    const hasUpperCase = /[A-Z]/.test(sanitizedPassword);
    const hasLowerCase = /[a-z]/.test(sanitizedPassword);
    const hasNumbers = /\d/.test(sanitizedPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(sanitizedPassword);
    
    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
}

export { sanitizeInput, validateEmail, validatePassword };