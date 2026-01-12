function validateUserInput(username, email) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernameRegex.test(username)) {
        return { valid: false, message: 'Username must be 3-20 characters and contain only letters, numbers, and underscores.' };
    }

    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Please enter a valid email address.' };
    }

    return { valid: true, message: 'Input is valid.' };
}function sanitizeInput(input) {
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }
    
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .trim();
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(sanitizeInput(email));
}

function validatePassword(password) {
    const sanitizedPassword = sanitizeInput(password);
    return sanitizedPassword.length >= 8 && 
           /[A-Z]/.test(sanitizedPassword) && 
           /[a-z]/.test(sanitizedPassword) && 
           /\d/.test(sanitizedPassword);
}

export { sanitizeInput, validateEmail, validatePassword };