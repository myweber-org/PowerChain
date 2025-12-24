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
}