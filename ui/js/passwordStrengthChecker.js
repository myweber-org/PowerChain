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
    
    const strengthScore = calculateStrengthScore(password, config);
    
    if (strengthScore < 3 && password.length >= 4) {
        suggestions.push("Consider using a longer password with more character variety");
    }
    
    if (/(.)\1{2,}/.test(password)) {
        suggestions.push("Avoid repeating characters multiple times in sequence");
    }
    
    const commonPatterns = ["123456", "password", "qwerty", "admin"];
    if (commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
        suggestions.push("Avoid using common words or sequences");
    }
    
    return {
        isValid: errors.length === 0,
        errors,
        suggestions,
        strengthScore,
        strengthLevel: getStrengthLevel(strengthScore)
    };
}

function calculateStrengthScore(password, config) {
    let score = 0;
    
    if (password.length >= config.minLength) score++;
    if (password.length >= config.minLength + 4) score++;
    
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    
    const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (specialCharRegex.test(password)) score++;
    
    const uniqueChars = new Set(password).size;
    if (uniqueChars >= password.length * 0.7) score++;
    
    return Math.min(score, 7);
}

function getStrengthLevel(score) {
    if (score <= 2) return "Weak";
    if (score <= 4) return "Moderate";
    if (score <= 6) return "Strong";
    return "Very Strong";
}

export { checkPasswordStrength };function checkPasswordStrength(password, options = {}) {
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
    
    const score = Math.max(0, 100 - (errors.length * 20));
    const strength = score >= 80 ? "strong" : score >= 60 ? "medium" : "weak";
    
    return {
        isValid: errors.length === 0,
        score,
        strength,
        errors
    };
}

module.exports = checkPasswordStrength;function checkPasswordStrength(password, options = {}) {
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
        if (password.length < 12) {
            suggestions.push("Consider using a longer password (12+ characters)");
        }
        if (isCommonPassword(password)) {
            suggestions.push("Avoid using commonly used passwords");
        }
        
        return {
            valid: true,
            strength: strengthScore,
            suggestions: suggestions
        };
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
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    const uniqueChars = new Set(password).size;
    if (uniqueChars / password.length > 0.7) score++;
    
    return Math.min(score, 5);
}

function isCommonPassword(password) {
    const commonPasswords = [
        "password", "123456", "qwerty", "admin", "welcome",
        "password123", "123456789", "12345678", "12345"
    ];
    return commonPasswords.includes(password.toLowerCase());
}

export { checkPasswordStrength, calculateStrengthScore };