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
}function checkPasswordStrength(password, options = {}) {
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
  const warnings = [];
  
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
  
  if (password.length > 50) {
    warnings.push("Password is unusually long and may be difficult to remember");
  }
  
  if (/(.)\1{3,}/.test(password)) {
    warnings.push("Password contains repeating characters which reduces security");
  }
  
  if (/^[a-zA-Z]+$/.test(password)) {
    warnings.push("Password contains only letters - consider adding numbers or special characters");
  }
  
  if (/^\d+$/.test(password)) {
    warnings.push("Password contains only numbers - consider adding letters or special characters");
  }
  
  const score = calculatePasswordScore(password, errors.length);
  
  return {
    isValid: errors.length === 0,
    score: score,
    errors: errors,
    warnings: warnings,
    suggestions: generateSuggestions(password, config)
  };
}

function calculatePasswordScore(password, errorCount) {
  let score = 100;
  score -= errorCount * 15;
  
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;
  
  const charTypes = [
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^a-zA-Z0-9]/.test(password)
  ].filter(Boolean).length;
  
  score += (charTypes - 1) * 10;
  
  if (/(.)\1{2,}/.test(password)) score -= 10;
  
  return Math.max(0, Math.min(100, Math.round(score)));
}

function generateSuggestions(password, config) {
  const suggestions = [];
  
  if (password.length < config.minLength) {
    suggestions.push(`Add ${config.minLength - password.length} more characters`);
  }
  
  if (config.requireUppercase && !/[A-Z]/.test(password)) {
    suggestions.push("Add at least one uppercase letter (A-Z)");
  }
  
  if (config.requireLowercase && !/[a-z]/.test(password)) {
    suggestions.push("Add at least one lowercase letter (a-z)");
  }
  
  if (config.requireNumbers && !/\d/.test(password)) {
    suggestions.push("Add at least one number (0-9)");
  }
  
  if (config.requireSpecialChars && !new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`).test(password)) {
    suggestions.push(`Add at least one special character (${config.specialChars.substring(0, 10)}...)`);
  }
  
  if (password.length < 12) {
    suggestions.push("Consider using a longer password (12+ characters recommended)");
  }
  
  return suggestions;
}

export { checkPasswordStrength };