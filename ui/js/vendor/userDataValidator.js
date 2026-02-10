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

function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validateUserRegistration(data) {
    const errors = {};
    
    if (!validateEmail(data.email)) {
        errors.email = 'Invalid email format';
    }
    
    if (!validatePassword(data.password)) {
        errors.password = 'Password must be at least 8 characters with uppercase, lowercase and number';
    }
    
    if (!validateUsername(data.username)) {
        errors.username = 'Username must be 3-20 characters (letters, numbers, underscore)';
    }
    
    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export { validateUserRegistration, validateEmail, validatePassword, validateUsername };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
}

function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validateUserRegistration(data) {
    const errors = [];
    
    if (!validateEmail(data.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePassword(data.password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase and number');
    }
    
    if (!validateUsername(data.username)) {
        errors.push('Username must be 3-20 alphanumeric characters or underscores');
    }
    
    if (data.password !== data.confirmPassword) {
        errors.push('Passwords do not match');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateUserRegistration, validateEmail, validatePassword, validateUsername };