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
        return 'Invalid username and password';
    } else if (!usernameValid) {
        return 'Invalid username';
    } else if (!passwordValid) {
        return 'Invalid password';
    } else {
        return 'Valid input';
    }
}

module.exports = {
    validateUsername,
    validatePassword,
    validateUserInput
};