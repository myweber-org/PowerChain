function validateUserInput(username, password) {
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
}function validateUserInput(username, email) {
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
            message: "Please provide a valid email address."
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
}function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
}

function validateUserInput(email, password) {
    const errors = [];
    
    if (!validateEmail(email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePassword(password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase and number');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateEmail, validatePassword, validateUserInput };