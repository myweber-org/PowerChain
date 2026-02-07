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
    
    if (!usernameValid) {
        return "Username must be 3-20 characters and contain only letters, numbers, and underscores.";
    }
    
    if (!passwordValid) {
        return "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
    }
    
    return "Input is valid.";
}

module.exports = { validateUserInput, validateUsername, validatePassword };