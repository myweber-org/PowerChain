function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validateUserInput(username, password) {
    const usernameValid = validateUsername(username);
    const passwordValid = validatePassword(password);
    
    if (!usernameValid && !passwordValid) {
        return { valid: false, message: 'Invalid username and password format' };
    } else if (!usernameValid) {
        return { valid: false, message: 'Invalid username format' };
    } else if (!passwordValid) {
        return { valid: false, message: 'Invalid password format' };
    }
    
    return { valid: true, message: 'Input validation successful' };
}

export { validateUserInput, validateUsername, validatePassword };