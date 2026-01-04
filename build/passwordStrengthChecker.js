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
        
        if (strengthScore < 3) {
            suggestions.push("Consider adding more character variety");
        }
        
        if (/(.)\1{2,}/.test(password)) {
            suggestions.push("Avoid repeating characters consecutively");
        }
        
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,}$/.test(password)) {
            return {
                valid: true,
                strength: "strong",
                score: strengthScore,
                suggestions: suggestions
            };
        } else if (/^(?=.*[a-z])(?=.*[A-Z]).{10,}$/.test(password)) {
            return {
                valid: true,
                strength: "medium",
                score: strengthScore,
                suggestions: suggestions
            };
        } else {
            return {
                valid: true,
                strength: "weak",
                score: strengthScore,
                suggestions: suggestions
            };
        }
    }
    
    return {
        valid: false,
        errors: errors,
        suggestions: ["Try mixing different character types", "Increase password length"]
    };
}

function calculateStrengthScore(password) {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    
    const uniqueChars = new Set(password).size;
    if (uniqueChars / password.length > 0.7) score++;
    
    return Math.min(score, 6);
}

export { checkPasswordStrength, calculateStrengthScore };