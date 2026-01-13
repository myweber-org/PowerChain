function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateAge(age) {
    return Number.isInteger(age) && age >= 18 && age <= 120;
}

function validateUsername(username) {
    return typeof username === 'string' && username.length >= 3 && username.length <= 30;
}

function validateUserProfile(profileData) {
    const errors = [];
    
    if (!validateUsername(profileData.username)) {
        errors.push('Username must be between 3 and 30 characters');
    }
    
    if (!validateEmail(profileData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validateAge(profileData.age)) {
        errors.push('Age must be between 18 and 120');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateUserProfile, validateEmail, validateAge, validateUsername };