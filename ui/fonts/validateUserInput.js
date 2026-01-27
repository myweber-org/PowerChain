function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && 
           hasUpperCase && 
           hasLowerCase && 
           hasNumber && 
           hasSpecialChar;
}

function validateUserInput(username, password) {
    const usernameValid = validateUsername(username);
    const passwordValid = validatePassword(password);
    
    if (!usernameValid && !passwordValid) {
        return { valid: false, message: "Username and password are invalid" };
    } else if (!usernameValid) {
        return { valid: false, message: "Username must be 3-20 characters and contain only letters, numbers, and underscores" };
    } else if (!passwordValid) {
        return { valid: false, message: "Password must be at least 8 characters with uppercase, lowercase, number, and special character" };
    }
    
    return { valid: true, message: "Input validation successful" };
}

export { validateUserInput, validateUsername, validatePassword };