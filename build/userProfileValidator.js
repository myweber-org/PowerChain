function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhoneNumber(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function validateUserProfile(profile) {
    const errors = [];

    if (!profile.name || profile.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    if (!validateEmail(profile.email)) {
        errors.push('Invalid email format');
    }

    if (!validatePhoneNumber(profile.phone)) {
        errors.push('Invalid phone number format');
    }

    if (profile.age && (profile.age < 0 || profile.age > 120)) {
        errors.push('Age must be between 0 and 120');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateUserProfile, validateEmail, validatePhoneNumber };