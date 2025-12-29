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
        if (password.length < 12) {
            suggestions.push("Consider using a longer password (12+ characters)");
        }
        if (isCommonPassword(password)) {
            suggestions.push("Avoid using commonly used passwords");
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
    return Math.min(score, 5);
}

function isCommonPassword(password) {
    const commonPasswords = [
        "password", "123456", "qwerty", "admin", "welcome",
        "password123", "letmein", "monkey", "dragon", "sunshine"
    ];
    return commonPasswords.includes(password.toLowerCase());
}

export { checkPasswordStrength, calculateStrengthScore, isCommonPassword };function checkPasswordStrength(password, options = {}) {
  const defaults = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    specialChars: "!@#$%^&*()_+-=[]{}|;:,.<>?"
  };
  
  const config = { ...defaults, ...options };
  const issues = [];
  
  if (password.length < config.minLength) {
    issues.push(`Password must be at least ${config.minLength} characters long`);
  }
  
  if (config.requireUppercase && !/[A-Z]/.test(password)) {
    issues.push("Password must contain at least one uppercase letter");
  }
  
  if (config.requireLowercase && !/[a-z]/.test(password)) {
    issues.push("Password must contain at least one lowercase letter");
  }
  
  if (config.requireNumbers && !/\d/.test(password)) {
    issues.push("Password must contain at least one number");
  }
  
  if (config.requireSpecialChars) {
    const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (!specialCharRegex.test(password)) {
      issues.push("Password must contain at least one special character");
    }
  }
  
  const score = issues.length === 0 ? 5 : 
                issues.length <= 2 ? 3 : 
                issues.length <= 4 ? 1 : 0;
  
  return {
    isValid: issues.length === 0,
    score: score,
    issues: issues,
    suggestions: issues.length > 0 ? [
      "Try using a longer password",
      "Mix different character types",
      "Avoid common words or patterns"
    ] : []
  };
}

function generatePassword(length = 12) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  let password = "";
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
}

export { checkPasswordStrength, generatePassword };