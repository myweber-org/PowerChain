function validateUserProfile(profile) {
    const requiredFields = ['username', 'email', 'age'];
    const errors = [];

    requiredFields.forEach(field => {
        if (!profile[field]) {
            errors.push(`${field} is required`);
        }
    });

    if (profile.email && !isValidEmail(profile.email)) {
        errors.push('Invalid email format');
    }

    if (profile.age && (profile.age < 0 || profile.age > 150)) {
        errors.push('Age must be between 0 and 150');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}function validateUserProfile(user) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minAge = 13;
    const maxAge = 120;

    if (!user.email || !emailRegex.test(user.email)) {
        return { valid: false, error: 'Invalid email format' };
    }

    if (typeof user.age !== 'number' || user.age < minAge || user.age > maxAge) {
        return { valid: false, error: `Age must be between ${minAge} and ${maxAge}` };
    }

    if (!user.username || user.username.trim().length < 3) {
        return { valid: false, error: 'Username must be at least 3 characters' };
    }

    return { valid: true, message: 'User profile is valid' };
}

module.exports = validateUserProfile;function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhoneNumber(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function validateUsername(username) {
    if (username.length < 3 || username.length > 20) {
        return false;
    }
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    if (password.length < 8) {
        return false;
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
}

function validateProfileData(userData) {
    const errors = {};
    
    if (!validateEmail(userData.email)) {
        errors.email = 'Invalid email format';
    }
    
    if (!validatePhoneNumber(userData.phone)) {
        errors.phone = 'Invalid phone number format';
    }
    
    if (!validateUsername(userData.username)) {
        errors.username = 'Username must be 3-20 characters and contain only letters, numbers, and underscores';
    }
    
    if (userData.password && !validatePassword(userData.password)) {
        errors.password = 'Password must be at least 8 characters and contain uppercase, lowercase, number, and special character';
    }
    
    if (userData.age && (userData.age < 13 || userData.age > 120)) {
        errors.age = 'Age must be between 13 and 120';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export { validateProfileData, validateEmail, validatePhoneNumber, validateUsername, validatePassword };