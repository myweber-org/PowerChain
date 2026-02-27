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
        message: "Input validation passed."
    };
}function validateUserInput(username, password) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!usernameRegex.test(username)) {
        throw new Error('Username must be 3-20 characters long and contain only letters, numbers, and underscores.');
    }

    if (!passwordRegex.test(password)) {
        throw new Error('Password must be at least 8 characters long and contain at least one letter and one number.');
    }

    return true;
}