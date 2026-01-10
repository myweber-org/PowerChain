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
        const specialRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
        if (!specialRegex.test(password)) {
            errors.push(`Password must contain at least one special character (${config.specialChars})`);
        }
    }
    
    const strengthScore = calculateStrengthScore(password, config);
    
    if (strengthScore < 2 && password.length > 0) {
        suggestions.push("Consider using a longer password with mixed character types");
    }
    
    if (/(.)\1{2,}/.test(password)) {
        suggestions.push("Avoid repeating characters multiple times in sequence");
    }
    
    if (/^(?:[0-9]+|[a-zA-Z]+)$/.test(password)) {
        suggestions.push("Mix letters, numbers, and special characters for better security");
    }
    
    return {
        isValid: errors.length === 0,
        errors,
        suggestions,
        strength: getStrengthLevel(strengthScore),
        score: strengthScore
    };
}

function calculateStrengthScore(password, config) {
    let score = 0;
    
    if (password.length >= config.minLength) score++;
    if (password.length >= 12) score++;
    
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    
    const specialRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (specialRegex.test(password)) score++;
    
    if (password.length >= 16) score++;
    
    const uniqueChars = new Set(password).size;
    if (uniqueChars / password.length > 0.7) score++;
    
    return Math.min(score, 5);
}

function getStrengthLevel(score) {
    const levels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
    return levels[Math.min(score, levels.length - 1)];
}

export { checkPasswordStrength };