function calculatePasswordEntropy(password) {
    const charsetSize = getCharsetSize(password);
    const length = password.length;
    return Math.log2(Math.pow(charsetSize, length));
}

function getCharsetSize(password) {
    let size = 0;
    if (/[a-z]/.test(password)) size += 26;
    if (/[A-Z]/.test(password)) size += 26;
    if (/[0-9]/.test(password)) size += 10;
    if (/[^a-zA-Z0-9]/.test(password)) size += 32;
    return size;
}

function evaluateStrength(password) {
    const entropy = calculatePasswordEntropy(password);
    if (entropy < 28) return 'Very Weak';
    if (entropy < 36) return 'Weak';
    if (entropy < 60) return 'Moderate';
    if (entropy < 128) return 'Strong';
    return 'Very Strong';
}

module.exports = { calculatePasswordEntropy, evaluateStrength };function checkPasswordStrength(password, options = {}) {
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
        if (/(.)\1{2,}/.test(password)) {
            suggestions.push("Avoid repeating characters multiple times");
        }
        
        return {
            valid: true,
            strength: strengthScore,
            strengthLabel: getStrengthLabel(strengthScore),
            suggestions: suggestions
        };
    }
    
    return {
        valid: false,
        errors: errors,
        suggestions: suggestions
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

function getStrengthLabel(score) {
    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
    return labels[score] || "Unknown";
}

export { checkPasswordStrength, calculateStrengthScore };