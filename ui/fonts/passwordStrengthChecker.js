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

export { checkPasswordStrength, validatePasswordOnInput };