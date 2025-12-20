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

export { checkPasswordStrength, validatePasswordOnInput };