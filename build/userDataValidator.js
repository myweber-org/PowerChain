function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    return true;
}

function validateUserData(user) {
    const errors = [];
    
    if (!user.email || !validateEmail(user.email)) {
        errors.push('Invalid email format');
    }
    
    if (!user.password || !validatePassword(user.password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase and number');
    }
    
    if (user.age && (user.age < 0 || user.age > 120)) {
        errors.push('Age must be between 0 and 120');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = { validateUserData, validateEmail, validatePassword };