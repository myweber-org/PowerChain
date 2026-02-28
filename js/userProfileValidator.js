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
};