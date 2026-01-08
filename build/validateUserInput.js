function validateUserInput(input) {
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }
    
    const trimmedInput = input.trim();
    
    if (trimmedInput.length === 0) {
        throw new Error('Input cannot be empty or whitespace only');
    }
    
    const maxLength = 255;
    if (trimmedInput.length > maxLength) {
        throw new Error(`Input exceeds maximum length of ${maxLength} characters`);
    }
    
    const dangerousPatterns = /[<>{}[\]]/g;
    if (dangerousPatterns.test(trimmedInput)) {
        throw new Error('Input contains potentially dangerous characters');
    }
    
    return trimmedInput;
}function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateUserInput(username, email) {
    const errors = [];
    
    if (!validateUsername(username)) {
        errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores');
    }
    
    if (!validateEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = validateUserInput;