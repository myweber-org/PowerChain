function validateUserProfile(profile) {
    const errors = [];
    
    if (!profile.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
        errors.push('Invalid email format');
    }
    
    if (typeof profile.age !== 'number' || profile.age < 18 || profile.age > 120) {
        errors.push('Age must be between 18 and 120');
    }
    
    if (!profile.username || profile.username.trim().length < 3) {
        errors.push('Username must be at least 3 characters');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = { validateUserProfile };function validateUserProfile(profile) {
    const validationRules = {
        name: /^[A-Z][a-zA-Z]{2,29}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        phone: /^\+?[1-9]\d{1,14}$/
    };

    const errors = {};

    if (!validationRules.name.test(profile.name)) {
        errors.name = 'Name must start with capital letter and be 3-30 characters';
    }

    if (!validationRules.email.test(profile.email)) {
        errors.email = 'Invalid email format';
    }

    if (profile.phone && !validationRules.phone.test(profile.phone)) {
        errors.phone = 'Phone must be valid international format';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

function formatValidationResults(validationResult) {
    if (validationResult.isValid) {
        return 'Profile validation passed';
    }
    
    const errorMessages = Object.entries(validationResult.errors)
        .map(([field, message]) => `${field}: ${message}`)
        .join('\n');
    
    return `Validation failed:\n${errorMessages}`;
}

export { validateUserProfile, formatValidationResults };function validateUserProfile(user) {
    const errors = [];

    if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        errors.push('Invalid email format');
    }

    if (typeof user.age !== 'number' || user.age < 0 || user.age > 150) {
        errors.push('Age must be a number between 0 and 150');
    }

    if (!user.username || user.username.trim().length < 3) {
        errors.push('Username must be at least 3 characters long');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = { validateUserProfile };