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
    
    if (/(.)\1{2,}/.test(password)) {
        suggestions.push("Avoid repeating the same character multiple times in a row");
    }
    
    if (/^[a-zA-Z]+$/.test(password)) {
        suggestions.push("Consider adding numbers or special characters for better security");
    }
    
    if (/^\d+$/.test(password)) {
        suggestions.push("Avoid using only numbers in your password");
    }
    
    const commonPasswords = ["password", "123456", "qwerty", "letmein", "welcome"];
    if (commonPasswords.includes(password.toLowerCase())) {
        errors.push("This password is too common and easily guessable");
    }
    
    const strengthScore = Math.max(0, 10 - errors.length * 2);
    let strengthLevel = "weak";
    
    if (strengthScore >= 8) strengthLevel = "strong";
    else if (strengthScore >= 5) strengthLevel = "moderate";
    
    return {
        isValid: errors.length === 0,
        strengthScore,
        strengthLevel,
        errors,
        suggestions,
        passedChecks: 5 - errors.length
    };
}

function validatePasswordOnInput(inputElement, options) {
    const result = checkPasswordStrength(inputElement.value, options);
    const feedbackElement = document.getElementById(inputElement.id + "-feedback");
    
    if (feedbackElement) {
        if (result.isValid) {
            feedbackElement.textContent = `Password strength: ${result.strengthLevel}`;
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
            message: getStrengthMessage(strengthScore),
            suggestions: suggestions
        };
    }
    
    return {
        valid: false,
        errors: errors,
        suggestions: getErrorSuggestions(errors)
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

function getErrorSuggestions(errors) {
    const suggestions = [];
    
    if (errors.some(e => e.includes("uppercase"))) {
        suggestions.push("Add capital letters like A, B, C");
    }
    
    if (errors.some(e => e.includes("lowercase"))) {
        suggestions.push("Add lowercase letters like a, b, c");
    }
    
    if (errors.some(e => e.includes("number"))) {
        suggestions.push("Add numbers like 1, 2, 3");
    }
    
    if (errors.some(e => e.includes("special"))) {
        suggestions.push("Add symbols like !, @, #");
    }
    
    return suggestions;
}

export { checkPasswordStrength, calculateStrengthScore };