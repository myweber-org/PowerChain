function validateUserInput(username, email) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!usernameRegex.test(username)) {
        return {
            valid: false,
            message: "Username must be 3-20 characters and contain only letters, numbers, and underscores."
        };
    }
    
    if (!emailRegex.test(email)) {
        return {
            valid: false,
            message: "Please enter a valid email address."
        };
    }
    
    return {
        valid: true,
        message: "Input validation successful."
    };
}function validateUserInput(username, email) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!usernameRegex.test(username)) {
        return { valid: false, message: 'Username must be 3-20 characters and contain only letters, numbers, and underscores.' };
    }
    
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Please enter a valid email address.' };
    }
    
    return { valid: true, message: 'Input validation passed.' };
}function validateUsername(username) {
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
    const usernameValid = validateUsername(username);
    const passwordValid = validatePassword(password);
    
    if (!usernameValid) {
        return {
            valid: false,
            message: "Username must be 3-20 characters and contain only letters, numbers, and underscores"
        };
    }
    
    if (!passwordValid) {
        return {
            valid: false,
            message: "Password must be at least 8 characters and contain uppercase, lowercase, numbers, and special characters"
        };
    }
    
    return {
        valid: true,
        message: "Input validation successful"
    };
}

module.exports = { validateUserInput, validateUsername, validatePassword };