function validateUserInput(username, email) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernameRegex.test(username)) {
        return {
            isValid: false,
            message: 'Username must be 3-20 characters and contain only letters, numbers, and underscores.'
        };
    }

    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            message: 'Please enter a valid email address.'
        };
    }

    return {
        isValid: true,
        message: 'Input validation successful.'
    };
}