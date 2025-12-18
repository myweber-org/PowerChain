function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) {
        return { valid: false, message: "Password must be at least 8 characters long" };
    }
    
    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: "Password must contain at least one uppercase letter" };
    }
    
    if (!/[a-z]/.test(password)) {
        return { valid: false, message: "Password must contain at least one lowercase letter" };
    }
    
    if (!/\d/.test(password)) {
        return { valid: false, message: "Password must contain at least one number" };
    }
    
    if (!/[!@#$%^&*]/.test(password)) {
        return { valid: false, message: "Password must contain at least one special character" };
    }
    
    return { valid: true, message: "Password is valid" };
}

function validateRegistrationForm(userData) {
    const errors = [];
    
    if (!validateEmail(userData.email)) {
        errors.push("Invalid email format");
    }
    
    const passwordValidation = validatePassword(userData.password);
    if (!passwordValidation.valid) {
        errors.push(passwordValidation.message);
    }
    
    if (userData.password !== userData.confirmPassword) {
        errors.push("Passwords do not match");
    }
    
    if (userData.username && userData.username.length < 3) {
        errors.push("Username must be at least 3 characters long");
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateRegistrationForm, validateEmail, validatePassword };