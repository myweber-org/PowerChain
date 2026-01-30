function validateUserProfile(name, email, age) {
    const errors = [];
    
    if (!name || name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Please provide a valid email address');
    }
    
    if (!age || age < 18 || age > 120) {
        errors.push('Age must be between 18 and 120');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}