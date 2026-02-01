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

module.exports = validateUserProfile;