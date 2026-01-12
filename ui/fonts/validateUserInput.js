function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validateUserInput(username, password) {
    if (!validateUsername(username)) {
        return {
            isValid: false,
            message: "Username must be 3-20 characters long and contain only letters, numbers, and underscores."
        };
    }

    if (!validatePassword(password)) {
        return {
            isValid: false,
            message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
        };
    }

    return {
        isValid: true,
        message: "User input is valid."
    };
}

module.exports = validateUserInput;