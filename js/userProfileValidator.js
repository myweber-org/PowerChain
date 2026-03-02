function validateUserProfile(name, email, age) {
    const errors = [];
    
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Invalid email format');
    }
    
    if (!age || typeof age !== 'number' || age < 0 || age > 150) {
        errors.push('Age must be a number between 0 and 150');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function sanitizeInput(input) {
    if (typeof input === 'string') {
        return input.trim().replace(/[<>]/g, '');
    }
    return input;
}

module.exports = {
    validateUserProfile,
    sanitizeInput
};function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function validateAge(age) {
    return Number.isInteger(age) && age >= 0 && age <= 120;
}

function validateProfileData(userData) {
    const errors = [];
    
    if (!validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePhone(userData.phone)) {
        errors.push('Phone number must contain at least 10 digits');
    }
    
    if (!validateAge(userData.age)) {
        errors.push('Age must be between 0 and 120');
    }
    
    if (!userData.name || userData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateProfileData, validateEmail, validatePhone, validateAge };