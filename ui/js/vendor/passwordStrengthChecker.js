function validatePassword(password, options = {}) {
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
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        score: calculatePasswordScore(password, config)
    };
}

function calculatePasswordScore(password, config) {
    let score = 0;
    
    if (password.length >= config.minLength) score += 25;
    if (password.length >= 12) score += 15;
    
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 20;
    if (/\d/.test(password)) score += 20;
    
    const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (specialCharRegex.test(password)) score += 20;
    
    const uniqueChars = new Set(password).size;
    if (uniqueChars / password.length > 0.7) score += 10;
    
    const commonPatterns = [/123/, /qwerty/, /password/, /admin/, /letmein/];
    if (!commonPatterns.some(pattern => pattern.test(password.toLowerCase()))) {
        score += 10;
    }
    
    return Math.min(score, 100);
}

function getStrengthLevel(score) {
    if (score >= 80) return { level: "strong", color: "#4CAF50" };
    if (score >= 60) return { level: "good", color: "#FFC107" };
    if (score >= 40) return { level: "fair", color: "#FF9800" };
    return { level: "weak", color: "#F44336" };
}

export { validatePassword, calculatePasswordScore, getStrengthLevel };function calculatePasswordEntropy(password) {
    const charSets = {
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numbers: /\d/.test(password),
        symbols: /[^a-zA-Z0-9]/.test(password)
    };
    
    const charSetCount = Object.values(charSets).filter(Boolean).length;
    let poolSize = 0;
    
    if (charSets.lowercase) poolSize += 26;
    if (charSets.uppercase) poolSize += 26;
    if (charSets.numbers) poolSize += 10;
    if (charSets.symbols) poolSize += 32;
    
    const entropy = Math.log2(Math.pow(poolSize, password.length));
    return {
        entropy: entropy,
        strength: getStrengthLevel(entropy),
        hasLowercase: charSets.lowercase,
        hasUppercase: charSets.uppercase,
        hasNumbers: charSets.numbers,
        hasSymbols: charSets.symbols
    };
}

function getStrengthLevel(entropy) {
    if (entropy < 40) return 'Very Weak';
    if (entropy < 60) return 'Weak';
    if (entropy < 80) return 'Moderate';
    if (entropy < 100) return 'Strong';
    return 'Very Strong';
}

function validatePasswordRequirements(password, minLength = 8) {
    const requirements = {
        minLength: password.length >= minLength,
        hasLowercase: /[a-z]/.test(password),
        hasUppercase: /[A-Z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSymbol: /[^a-zA-Z0-9]/.test(password)
    };
    
    const passed = Object.values(requirements).filter(Boolean).length;
    const total = Object.keys(requirements).length;
    
    return {
        requirements: requirements,
        score: Math.round((passed / total) * 100),
        isAcceptable: passed === total
    };
}

export { calculatePasswordEntropy, validatePasswordRequirements };function checkPasswordStrength(password, options = {}) {
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
      errors.push("Password must contain at least one special character");
    }
  }
  
  if (errors.length === 0) {
    const strengthScore = calculateStrengthScore(password);
    let strengthLevel;
    
    if (strengthScore >= 80) {
      strengthLevel = "strong";
    } else if (strengthScore >= 60) {
      strengthLevel = "moderate";
    } else {
      strengthLevel = "weak";
    }
    
    return {
      valid: true,
      strength: strengthLevel,
      score: strengthScore,
      suggestions: generateSuggestions(password, config)
    };
  }
  
  return {
    valid: false,
    errors: errors,
    suggestions: generateSuggestions(password, config)
  };
}

function calculateStrengthScore(password) {
  let score = 0;
  const length = password.length;
  
  score += Math.min(length * 4, 40);
  
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  
  if (hasUppercase && hasLowercase) score += 15;
  if (hasNumbers) score += 15;
  if (hasSpecial) score += 20;
  
  const uniqueChars = new Set(password).size;
  score += Math.min(uniqueChars * 2, 20);
  
  const commonPatterns = ["123", "abc", "qwerty", "password", "admin"];
  for (const pattern of commonPatterns) {
    if (password.toLowerCase().includes(pattern)) {
      score -= 20;
      break;
    }
  }
  
  return Math.max(0, Math.min(100, score));
}

function generateSuggestions(password, config) {
  const suggestions = [];
  
  if (password.length < 12) {
    suggestions.push("Use at least 12 characters for better security");
  }
  
  if (password.length < config.minLength * 1.5) {
    suggestions.push("Consider using a longer password");
  }
  
  if (!/[A-Z]/.test(password) && config.requireUppercase) {
    suggestions.push("Add uppercase letters for better security");
  }
  
  if (!/[^A-Za-z0-9]/.test(password) && config.requireSpecialChars) {
    suggestions.push("Include special characters like !@#$%");
  }
  
  if (/(.)\1{2,}/.test(password)) {
    suggestions.push("Avoid repeating characters multiple times");
  }
  
  const commonWords = ["password", "admin", "welcome", "qwerty", "letmein"];
  const lowerPassword = password.toLowerCase();
  for (const word of commonWords) {
    if (lowerPassword.includes(word)) {
      suggestions.push("Avoid common dictionary words");
      break;
    }
  }
  
  if (/^\d+$/.test(password)) {
    suggestions.push("Avoid using only numbers");
  }
  
  return suggestions;
}

export { checkPasswordStrength, calculateStrengthScore };function calculatePasswordEntropy(password) {
    if (!password || password.length === 0) return 0;
    
    let charsetSize = 0;
    if (/[a-z]/.test(password)) charsetSize += 26;
    if (/[A-Z]/.test(password)) charsetSize += 26;
    if (/[0-9]/.test(password)) charsetSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;
    
    const entropy = Math.log2(Math.pow(charsetSize, password.length));
    return Math.round(entropy * 100) / 100;
}

function evaluatePasswordStrength(password) {
    const entropy = calculatePasswordEntropy(password);
    
    if (entropy < 40) return 'Weak';
    if (entropy < 60) return 'Moderate';
    if (entropy < 80) return 'Strong';
    return 'Very Strong';
}

function validatePassword(password) {
    const strength = evaluatePasswordStrength(password);
    const entropy = calculatePasswordEntropy(password);
    const requirements = {
        hasLowercase: /[a-z]/.test(password),
        hasUppercase: /[A-Z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecial: /[^a-zA-Z0-9]/.test(password),
        minLength: password.length >= 8
    };
    
    return {
        strength: strength,
        entropy: entropy,
        meetsRequirements: requirements,
        isValid: Object.values(requirements).every(req => req === true)
    };
}

export { validatePassword, calculatePasswordEntropy, evaluatePasswordStrength };