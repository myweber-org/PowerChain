function validateUserProfile(name, email, age) {
    const errors = [];

    if (!name || name.trim().length === 0) {
        errors.push('Name is required');
    }

    if (!email || !email.includes('@')) {
        errors.push('Valid email is required');
    }

    if (age && (isNaN(age) || age < 0 || age > 120)) {
        errors.push('Age must be a number between 0 and 120');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}