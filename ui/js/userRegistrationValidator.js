function validateRegistrationForm(email, password, confirmPassword) {
    const errors = [];

    if (!email || !email.includes('@')) {
        errors.push('Invalid email address');
    }

    if (!password || password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }

    if (password !== confirmPassword) {
        errors.push('Passwords do not match');
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
        errors.push('Password must contain uppercase, lowercase, numbers, and special characters');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function validateUserAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age >= 13;
}

module.exports = {
    validateRegistrationForm,
    validateUserAge
};