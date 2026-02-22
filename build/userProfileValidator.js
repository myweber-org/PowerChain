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

export { validateUserProfile, validateEmail, validateAge, validateUsername };function validateUserProfile(name, email, age) {
    const errors = [];
    
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Please provide a valid email address');
    }
    
    if (typeof age !== 'number' || age < 0 || age > 120) {
        errors.push('Age must be a number between 0 and 120');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = validateUserProfile;function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && 
           hasUpperCase && 
           hasLowerCase && 
           hasNumbers && 
           hasSpecialChar;
}

function validateAge(age) {
    const parsedAge = parseInt(age, 10);
    return !isNaN(parsedAge) && parsedAge >= 13 && parsedAge <= 120;
}

function validateProfileInput(userData) {
    const errors = {};
    
    if (!validateEmail(userData.email)) {
        errors.email = 'Invalid email format';
    }
    
    if (!validateUsername(userData.username)) {
        errors.username = 'Username must be 3-20 characters and contain only letters, numbers, and underscores';
    }
    
    if (!validatePassword(userData.password)) {
        errors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    }
    
    if (!validateAge(userData.age)) {
        errors.age = 'Age must be between 13 and 120';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export { validateProfileInput, validateEmail, validateUsername, validatePassword, validateAge };