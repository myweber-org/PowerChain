function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
}

function validateUserInput(username, password) {
    const usernameValid = validateUsername(username);
    const passwordValid = validatePassword(password);
    
    if (!usernameValid) {
        return "Invalid username. Username must be 3-20 characters long and contain only letters, numbers, and underscores.";
    }
    
    if (!passwordValid) {
        return "Invalid password. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.";
    }
    
    return "User input is valid.";
}

module.exports = {
    validateUsername,
    validatePassword,
    validateUserInput
};