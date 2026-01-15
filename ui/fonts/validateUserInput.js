function validateUsername(username) {
    const minLength = 3;
    const maxLength = 20;
    const regex = /^[a-zA-Z0-9_]+$/;
    
    if (typeof username !== 'string') {
        return { valid: false, message: 'Username must be a string' };
    }
    
    if (username.length < minLength) {
        return { valid: false, message: `Username must be at least ${minLength} characters long` };
    }
    
    if (username.length > maxLength) {
        return { valid: false, message: `Username must not exceed ${maxLength} characters` };
    }
    
    if (!regex.test(username)) {
        return { valid: false, message: 'Username can only contain letters, numbers, and underscores' };
    }
    
    return { valid: true, message: 'Username is valid' };
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumbers = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    
    if (typeof password !== 'string') {
        return { valid: false, message: 'Password must be a string' };
    }
    
    if (password.length < minLength) {
        return { valid: false, message: `Password must be at least ${minLength} characters long` };
    }
    
    if (!hasUpperCase.test(password)) {
        return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    
    if (!hasLowerCase.test(password)) {
        return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
    
    if (!hasNumbers.test(password)) {
        return { valid: false, message: 'Password must contain at least one number' };
    }
    
    if (!hasSpecialChar.test(password)) {
        return { valid: false, message: 'Password must contain at least one special character' };
    }
    
    return { valid: true, message: 'Password is valid' };
}

export { validateUsername, validatePassword };