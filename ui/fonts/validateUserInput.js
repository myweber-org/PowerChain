function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
}

function validateUserInput(username, password) {
    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(password);
    
    if (!isUsernameValid) {
        return { valid: false, message: 'Username must be 3-20 characters and contain only letters, numbers, and underscores.' };
    }
    
    if (!isPasswordValid) {
        return { valid: false, message: 'Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, and one number.' };
    }
    
    return { valid: true, message: 'Input is valid.' };
}

module.exports = { validateUserInput, validateUsername, validatePassword };function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    return input
        .trim()
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

module.exports = { sanitizeInput, validateEmail, validatePassword };