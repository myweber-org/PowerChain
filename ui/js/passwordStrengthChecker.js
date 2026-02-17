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
            suggestions.push("Consider adding more character variety to increase password strength");
        }
        if (password.length < 12) {
            suggestions.push("Consider using a longer password (12+ characters recommended)");
        }
        if (isCommonPassword(password)) {
            suggestions.push("This password appears in common password lists - consider using something more unique");
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors,
        suggestions,
        strength: errors.length === 0 ? calculateStrengthScore(password) : 0
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
        "password123", "letmein", "monkey", "dragon", "sunshine"
    ];
    return commonPasswords.includes(password.toLowerCase());
}

export { checkPasswordStrength, calculateStrengthScore, isCommonPassword };function passwordStrengthChecker(password, options = {}) {
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
    const score = { total: 0, max: 5 };
    
    if (password.length >= config.minLength) {
        score.total += 1;
    } else {
        errors.push(`Password must be at least ${config.minLength} characters long`);
    }
    
    if (config.requireUppercase && /[A-Z]/.test(password)) {
        score.total += 1;
    } else if (config.requireUppercase) {
        errors.push("Password must contain at least one uppercase letter");
    }
    
    if (config.requireLowercase && /[a-z]/.test(password)) {
        score.total += 1;
    } else if (config.requireLowercase) {
        errors.push("Password must contain at least one lowercase letter");
    }
    
    if (config.requireNumbers && /\d/.test(password)) {
        score.total += 1;
    } else if (config.requireNumbers) {
        errors.push("Password must contain at least one number");
    }
    
    const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (config.requireSpecialChars && specialCharRegex.test(password)) {
        score.total += 1;
    } else if (config.requireSpecialChars) {
        errors.push("Password must contain at least one special character");
    }
    
    const strength = score.total >= 4 ? "strong" : score.total >= 3 ? "medium" : "weak";
    
    return {
        isValid: errors.length === 0,
        score: score.total,
        maxScore: score.max,
        strength: strength,
        errors: errors,
        suggestions: strength === "weak" ? ["Consider using a longer password", "Mix different character types"] : []
    };
}