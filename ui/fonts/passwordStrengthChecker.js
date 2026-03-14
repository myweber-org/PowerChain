function checkPasswordStrength(password, options = {}) {
    const defaults = {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        specialChars: "!@#$%^&*()_+-=[]{}|;:,.<>?"
    };
    
    const config = { ...defaults, ...options };
    const errors = [];
    const suggestions = [];
    
    if (password.length < config.minLength) {
        errors.push(`Password must be at least ${config.minLength} characters long`);
    }
    
    if (config.requireUppercase && !/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
    }
    
    if (config.requireLowercase && !/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter");
    }
    
    if (config.requireNumbers && !/\d/.test(password)) {
        errors.push("Password must contain at least one number");
    }
    
    if (config.requireSpecialChars) {
        const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
        if (!specialCharRegex.test(password)) {
            errors.push(`Password must contain at least one special character (${config.specialChars})`);
        }
    }
    
    if (errors.length === 0) {
        const strengthScore = calculateStrengthScore(password);
        return {
            valid: true,
            strength: strengthScore,
            message: getStrengthMessage(strengthScore)
        };
    }
    
    return {
        valid: false,
        errors: errors,
        suggestions: generateSuggestions(password, config)
    };
}

function calculateStrengthScore(password) {
    let score = 0;
    
    if (password.length >= 12) score += 2;
    else if (password.length >= 8) score += 1;
    
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    const uniqueChars = new Set(password).size;
    if (uniqueChars / password.length > 0.7) score += 1;
    
    return Math.min(score, 5);
}

function getStrengthMessage(score) {
    const messages = [
        "Very Weak",
        "Weak",
        "Fair",
        "Good",
        "Strong",
        "Very Strong"
    ];
    return messages[score];
}

function generateSuggestions(password, config) {
    const suggestions = [];
    
    if (password.length < config.minLength) {
        suggestions.push(`Add ${config.minLength - password.length} more characters`);
    }
    
    if (config.requireUppercase && !/[A-Z]/.test(password)) {
        suggestions.push("Add at least one uppercase letter");
    }
    
    if (config.requireLowercase && !/[a-z]/.test(password)) {
        suggestions.push("Add at least one lowercase letter");
    }
    
    if (config.requireNumbers && !/\d/.test(password)) {
        suggestions.push("Add at least one number");
    }
    
    if (config.requireSpecialChars && !new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`).test(password)) {
        suggestions.push(`Add at least one special character from: ${config.specialChars}`);
    }
    
    if (password.toLowerCase().includes("password") || password.toLowerCase().includes("123")) {
        suggestions.push("Avoid common words and sequences");
    }
    
    return suggestions;
}

export { checkPasswordStrength };