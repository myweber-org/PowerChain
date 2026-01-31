function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateAge(age) {
    return Number.isInteger(age) && age >= 0 && age <= 120;
}

function updateUserProfile(userData) {
    const validationErrors = [];
    
    if (!userData.name || userData.name.trim().length === 0) {
        validationErrors.push('Name is required');
    }
    
    if (!validateEmail(userData.email)) {
        validationErrors.push('Invalid email format');
    }
    
    if (!validateAge(userData.age)) {
        validationErrors.push('Age must be between 0 and 120');
    }
    
    if (validationErrors.length > 0) {
        return {
            success: false,
            errors: validationErrors
        };
    }
    
    const updatedProfile = {
        name: userData.name.trim(),
        email: userData.email.toLowerCase(),
        age: userData.age,
        lastUpdated: new Date().toISOString()
    };
    
    return {
        success: true,
        profile: updatedProfile
    };
}

function getUserProfileSummary(profile) {
    if (!profile || !profile.name) {
        return 'No profile available';
    }
    
    return `${profile.name}, ${profile.age} years old - ${profile.email}`;
}

export { updateUserProfile, getUserProfileSummary, validateEmail, validateAge };