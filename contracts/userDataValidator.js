function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
}

function validatePhoneNumber(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function validateUserData(user) {
    const errors = [];
    
    if (!validateEmail(user.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePassword(user.password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase and number');
    }
    
    if (user.phone && !validatePhoneNumber(user.phone)) {
        errors.push('Invalid phone number format');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateUserData, validateEmail, validatePassword, validatePhoneNumber };