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
        if (password.length < 12) {
            suggestions.push("Consider using a longer password for better security");
        }
        
        if (/(.)\1{2,}/.test(password)) {
            suggestions.push("Avoid repeating characters multiple times in a row");
        }
        
        if (/^\d+$/.test(password) || /^[a-zA-Z]+$/.test(password)) {
            suggestions.push("Mix different character types for stronger passwords");
        }
    }
    
    const score = errors.length === 0 ? 
        (password.length >= 12 ? 5 : 
         password.length >= 10 ? 4 : 3) : 0;
    
    return {
        isValid: errors.length === 0,
        score: score,
        errors: errors,
        suggestions: suggestions,
        meetsRequirements: {
            length: password.length >= config.minLength,
            hasUppercase: config.requireUppercase ? /[A-Z]/.test(password) : true,
            hasLowercase: config.requireLowercase ? /[a-z]/.test(password) : true,
            hasNumbers: config.requireNumbers ? /\d/.test(password) : true,
            hasSpecialChars: config.requireSpecialChars ? 
                new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`).test(password) : true
        }
    };
}

function validatePasswordOnInput(inputElement, options) {
    const result = checkPasswordStrength(inputElement.value, options);
    const feedbackElement = document.getElementById(inputElement.id + '-feedback');
    
    if (feedbackElement) {
        if (result.isValid) {
            feedbackElement.textContent = "Password strength: " + 
                ["Weak", "Fair", "Good", "Strong", "Very Strong"][result.score - 1];
            feedbackElement.className = "password-feedback valid";
        } else {
            feedbackElement.textContent = result.errors.join(". ");
            feedbackElement.className = "password-feedback invalid";
        }
    }
    
    return result;
}

export { checkPasswordStrength, validatePasswordOnInput };function checkPasswordStrength(password, options = {}) {
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
    const strengthLevel = getStrengthLevel(strengthScore);
    
    if (strengthScore < 70) {
        suggestions.push("Consider using a longer password with more character variety");
    }
    
    if (/(.)\1{2,}/.test(password)) {
        suggestions.push("Avoid repeating characters multiple times in sequence");
    }
    
    if (/^\d+$/.test(password)) {
        suggestions.push("Avoid using only numbers as your password");
    }
    
    return {
        isValid: errors.length === 0,
        errors,
        strengthScore,
        strengthLevel,
        suggestions: suggestions.length > 0 ? suggestions : ["Password strength is good"]
    };
}

function calculateStrengthScore(password, config) {
    let score = 0;
    
    score += Math.min(password.length * 4, 40);
    
    const charCategories = {
        uppercase: /[A-Z]/g,
        lowercase: /[a-z]/g,
        numbers: /\d/g,
        special: new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`, 'g')
    };
    
    Object.values(charCategories).forEach(regex => {
        const matches = password.match(regex);
        if (matches && matches.length > 0) {
            score += 10;
        }
    });
    
    const uniqueChars = new Set(password).size;
    score += Math.min(uniqueChars * 2, 20);
    
    if (password.length > 12) {
        score += 10;
    }
    
    return Math.min(score, 100);
}

function getStrengthLevel(score) {
    if (score >= 80) return "strong";
    if (score >= 60) return "medium";
    if (score >= 40) return "weak";
    return "very-weak";
}