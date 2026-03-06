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
        return { valid: false, message: "Username must be 3-20 characters and contain only letters, numbers, and underscores." };
    }
    
    if (!isPasswordValid) {
        return { valid: false, message: "Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, and one number." };
    }
    
    return { valid: true, message: "Input is valid." };
}

module.exports = validateUserInput;function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && 
           hasUpperCase && 
           hasLowerCase && 
           hasNumbers && 
           hasSpecialChar;
}

function validateUserInput(username, password) {
    const errors = [];
    
    if (!validateUsername(username)) {
        errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores');
    }
    
    if (!validatePassword(password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateUsername, validatePassword, validateUserInput };