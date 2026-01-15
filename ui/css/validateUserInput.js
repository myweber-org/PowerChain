function validateUserInput(username, email) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const errors = [];
    
    if (!usernameRegex.test(username)) {
        errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores.');
    }
    
    if (!emailRegex.test(email)) {
        errors.push('Please enter a valid email address.');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}function validateUserInput(username, password) {
    const errors = [];

    if (!username || username.trim() === '') {
        errors.push('Username is required');
    } else if (username.length < 3) {
        errors.push('Username must be at least 3 characters long');
    }

    if (!password || password.trim() === '') {
        errors.push('Password is required');
    } else if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    } else if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    } else if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}