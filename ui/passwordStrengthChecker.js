function validatePassword(password, options = {}) {
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
            errors.push("Password must contain at least one special character");
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        score: calculatePasswordScore(password, config)
    };
}

function calculatePasswordScore(password, config) {
    let score = 0;
    
    // Length contributes up to 40 points
    score += Math.min(password.length * 2, 40);
    
    // Character variety contributes up to 60 points
    if (/[A-Z]/.test(password)) score += 15;
    if (/[a-z]/.test(password)) score += 15;
    if (/\d/.test(password)) score += 15;
    
    const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (specialCharRegex.test(password)) score += 15;
    
    // Bonus for mixed patterns
    if (/(?=.*[a-z])(?=.*[A-Z])/.test(password)) score += 10;
    if (/(?=.*\d)(?=.*[a-zA-Z])/.test(password)) score += 10;
    
    return Math.min(score, 100);
}

export { validatePassword, calculatePasswordScore };function checkPasswordStrength(password, options = {}) {
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
    
    const strengthScore = calculateStrengthScore(password, config);
    
    if (strengthScore < 3 && password.length > 0) {
        suggestions.push("Consider using a longer password with mixed character types");
        suggestions.push("Avoid common words or patterns");
    }
    
    return {
        isValid: errors.length === 0,
        errors,
        strengthScore,
        strengthLevel: getStrengthLevel(strengthScore),
        suggestions: suggestions.length > 0 ? suggestions : ["Password meets all requirements"]
    };
}

function calculateStrengthScore(password, config) {
    let score = 0;
    
    if (password.length >= config.minLength) score++;
    if (password.length >= 12) score++;
    
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    
    const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (specialCharRegex.test(password)) score++;
    
    if (password.length > 16) score++;
    
    const commonPatterns = [/123/, /qwerty/, /password/i, /admin/i, /letmein/i];
    if (!commonPatterns.some(pattern => pattern.test(password))) {
        score++;
    }
    
    return Math.min(score, 10);
}

function getStrengthLevel(score) {
    if (score >= 8) return "Very Strong";
    if (score >= 6) return "Strong";
    if (score >= 4) return "Moderate";
    if (score >= 2) return "Weak";
    return "Very Weak";
}

export { checkPasswordStrength, calculateStrengthScore, getStrengthLevel };