function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateProfile(userProfile) {
    const errors = [];
    
    if (!userProfile.username || userProfile.username.trim().length < 3) {
        errors.push('Username must be at least 3 characters long');
    }
    
    if (!userProfile.email || !validateEmail(userProfile.email)) {
        errors.push('Please provide a valid email address');
    }
    
    if (userProfile.age && (userProfile.age < 0 || userProfile.age > 150)) {
        errors.push('Age must be between 0 and 150');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function updateUserProfile(currentProfile, updates) {
    const validation = validateProfile(updates);
    
    if (!validation.isValid) {
        return {
            success: false,
            errors: validation.errors,
            profile: currentProfile
        };
    }
    
    const updatedProfile = {
        ...currentProfile,
        ...updates,
        lastUpdated: new Date().toISOString()
    };
    
    return {
        success: true,
        errors: [],
        profile: updatedProfile
    };
}

function formatProfileForDisplay(profile) {
    return {
        username: profile.username || 'Not set',
        email: profile.email || 'Not set',
        age: profile.age || 'Not specified',
        lastUpdated: profile.lastUpdated || 'Never'
    };
}

export { validateEmail, validateProfile, updateUserProfile, formatProfileForDisplay };