
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

export { sanitizeInput, validateEmail, validatePassword };function validateUserInput(username, password) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!usernameRegex.test(username)) {
        return {
            isValid: false,
            message: "Username must be 3-20 characters and contain only letters, numbers, and underscores."
        };
    }

    if (!passwordRegex.test(password)) {
        return {
            isValid: false,
            message: "Password must be at least 8 characters with at least one letter and one number."
        };
    }

    return {
        isValid: true,
        message: "Input validation passed."
    };
}