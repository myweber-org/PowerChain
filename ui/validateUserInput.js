function validateUserInput(input, type) {
    if (typeof input !== 'string') {
        return { isValid: false, error: 'Input must be a string' };
    }

    const trimmedInput = input.trim();

    if (trimmedInput.length === 0) {
        return { isValid: false, error: 'Input cannot be empty' };
    }

    switch (type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return {
                isValid: emailRegex.test(trimmedInput),
                error: emailRegex.test(trimmedInput) ? null : 'Invalid email format'
            };
        case 'username':
            const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
            return {
                isValid: usernameRegex.test(trimmedInput),
                error: usernameRegex.test(trimmedInput) ? null : 'Username must be 3-20 characters and contain only letters, numbers, and underscores'
            };
        case 'password':
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
            return {
                isValid: passwordRegex.test(trimmedInput),
                error: passwordRegex.test(trimmedInput) ? null : 'Password must be at least 8 characters with uppercase, lowercase, and a number'
            };
        default:
            return { isValid: true, error: null, value: trimmedInput };
    }
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

export { validateUsername, validateEmail, validateUserInput };