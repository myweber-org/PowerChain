function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateAge(age) {
    return Number.isInteger(age) && age >= 18 && age <= 120;
}

function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validateProfile(profileData) {
    const errors = [];

    if (!validateEmail(profileData.email)) {
        errors.push('Invalid email format');
    }

    if (!validateAge(profileData.age)) {
        errors.push('Age must be between 18 and 120');
    }

    if (!validateUsername(profileData.username)) {
        errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores');
    }

    if (!profileData.country || profileData.country.trim() === '') {
        errors.push('Country is required');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = {
    validateEmail,
    validateAge,
    validateUsername,
    validateProfile
};