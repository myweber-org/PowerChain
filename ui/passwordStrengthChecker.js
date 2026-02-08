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
    
    // Length contributes up to 40 points
    score += Math.min(password.length * 2, 40);
    
    // Character variety contributes up to 60 points
    if (/[A-Z]/.test(password)) score += 15;
    if (/[a-z]/.test(password)) score += 15;
    if (/\d/.test(password)) score += 15;
    
    const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (specialCharRegex.test(password)) score += 15;
    
    // Bonus for mixed patterns
    if (/(?=.*[a-z])(?=.*[A-Z])/.test(password)) score += 10;
    if (/(?=.*\d)(?=.*[a-zA-Z])/.test(password)) score += 10;
    
    return Math.min(score, 100);
}

export { validatePassword, calculatePasswordScore };function checkPasswordStrength(password, options = {}) {
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
    
    if (strengthScore < 3 && password.length > 0) {
        suggestions.push("Consider using a longer password with mixed character types");
        suggestions.push("Avoid common words or patterns");
    }
    
    return {
        isValid: errors.length === 0,
        errors,
        strengthScore,
        strengthLevel: getStrengthLevel(strengthScore),
        suggestions: suggestions.length > 0 ? suggestions : ["Password meets all requirements"]
    };
}

function calculateStrengthScore(password, config) {
    let score = 0;
    
    if (password.length >= config.minLength) score++;
    if (password.length >= 12) score++;
    
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    
    const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (specialCharRegex.test(password)) score++;
    
    if (password.length > 16) score++;
    
    const commonPatterns = [/123/, /qwerty/, /password/i, /admin/i, /letmein/i];
    if (!commonPatterns.some(pattern => pattern.test(password))) {
        score++;
    }
    
    return Math.min(score, 10);
}

function getStrengthLevel(score) {
    if (score >= 8) return "Very Strong";
    if (score >= 6) return "Strong";
    if (score >= 4) return "Moderate";
    if (score >= 2) return "Weak";
    return "Very Weak";
}

export { checkPasswordStrength, calculateStrengthScore, getStrengthLevel };function passwordStrengthChecker(password, options = {}) {
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
    
    if (password.length > 20) {
        suggestions.push("Consider using a shorter password for better memorability");
    }
    
    if (/(.)\1{2,}/.test(password)) {
        suggestions.push("Avoid repeating characters multiple times in a row");
    }
    
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        suggestions.push("Strong password! Consider using a passphrase for even better security");
    }
    
    const score = errors.length === 0 ? 100 - (suggestions.length * 5) : 0;
    
    return {
        isValid: errors.length === 0,
        score: Math.max(0, score),
        errors,
        suggestions,
        configUsed: config
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
        const strength = calculateStrengthScore(password);
        
        if (strength < 3) {
            suggestions.push("Consider making your password longer");
            suggestions.push("Add more variety of character types");
        }
        
        if (/(.)\1{2,}/.test(password)) {
            suggestions.push("Avoid repeating characters multiple times");
        }
        
        if (/^[a-zA-Z]+$/.test(password)) {
            suggestions.push("Avoid using only letters");
        }
        
        if (/^\d+$/.test(password)) {
            suggestions.push("Avoid using only numbers");
        }
        
        return {
            valid: true,
            strength: strength,
            score: getStrengthLabel(strength),
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
    if (password.length >= 16) score++;
    
    const uniqueChars = new Set(password).size;
    if (uniqueChars / password.length > 0.7) score++;
    
    return Math.min(score, 5);
}

function getStrengthLabel(score) {
    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
    return labels[Math.min(score, labels.length - 1)];
}

export { checkPasswordStrength, calculateStrengthScore };function checkPasswordStrength(password, options = {}) {
  const defaults = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    specialChars: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };
  
  const config = { ...defaults, ...options };
  const errors = [];
  const suggestions = [];
  
  if (password.length < config.minLength) {
    errors.push(`Password must be at least ${config.minLength} characters long`);
  }
  
  if (config.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (config.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (config.requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
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
      suggestions.push('Consider adding more character variety');
    }
    if (password.length < 12) {
      suggestions.push('Use longer passwords for better security');
    }
    if (/(.)\1{2,}/.test(password)) {
      suggestions.push('Avoid repeating characters consecutively');
    }
    
    return {
      valid: true,
      strength: getStrengthLabel(strengthScore),
      score: strengthScore,
      suggestions: suggestions
    };
  }
  
  return {
    valid: false,
    errors: errors,
    suggestions: ['Try mixing different character types', 'Use longer passwords']
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
  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  return labels[score] || 'Unknown';
}

export { checkPasswordStrength, calculateStrengthScore };function PasswordStrengthChecker(config = {}) {
  const defaultConfig = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    specialChars: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    bannedWords: ["password", "123456", "qwerty"]
  };

  this.config = { ...defaultConfig, ...config };
  this.score = 0;
  this.maxScore = 100;
  this.feedback = [];
}

PasswordStrengthChecker.prototype.calculateScore = function(password) {
  this.score = 0;
  this.feedback = [];

  if (!password || typeof password !== 'string') {
    this.feedback.push("Password cannot be empty");
    return this.score;
  }

  const lengthScore = this.evaluateLength(password);
  const complexityScore = this.evaluateComplexity(password);
  const uniquenessScore = this.evaluateUniqueness(password);
  const penaltyScore = this.applyPenalties(password);

  this.score = Math.max(0, lengthScore + complexityScore + uniquenessScore - penaltyScore);
  return this.score;
};

PasswordStrengthChecker.prototype.evaluateLength = function(password) {
  const length = password.length;
  let score = 0;

  if (length >= this.config.minLength) {
    score = Math.min(30, (length - this.config.minLength) * 2 + 10);
    if (length >= this.config.minLength * 2) {
      score = 30;
    }
  } else {
    this.feedback.push(`Password must be at least ${this.config.minLength} characters long`);
  }

  return score;
};

PasswordStrengthChecker.prototype.evaluateComplexity = function(password) {
  let score = 0;
  const checks = [];

  if (this.config.requireUppercase && /[A-Z]/.test(password)) {
    score += 15;
  } else if (this.config.requireUppercase) {
    checks.push("uppercase letters");
  }

  if (this.config.requireLowercase && /[a-z]/.test(password)) {
    score += 15;
  } else if (this.config.requireLowercase) {
    checks.push("lowercase letters");
  }

  if (this.config.requireNumbers && /\d/.test(password)) {
    score += 15;
  } else if (this.config.requireNumbers) {
    checks.push("numbers");
  }

  if (this.config.requireSpecialChars) {
    const specialRegex = new RegExp(`[${this.config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (specialRegex.test(password)) {
      score += 15;
    } else {
      checks.push("special characters");
    }
  }

  if (checks.length > 0) {
    this.feedback.push(`Add ${checks.join(", ")} to increase strength`);
  }

  return score;
};

PasswordStrengthChecker.prototype.evaluateUniqueness = function(password) {
  let score = 0;
  const lowerPassword = password.toLowerCase();

  const hasRepeating = /(.)\1{2,}/.test(password);
  const hasSequential = /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(password);

  if (!hasRepeating && !hasSequential) {
    score = 10;
  } else {
    if (hasRepeating) this.feedback.push("Avoid repeating characters");
    if (hasSequential) this.feedback.push("Avoid sequential patterns");
  }

  return score;
};

PasswordStrengthChecker.prototype.applyPenalties = function(password) {
  let penalty = 0;
  const lowerPassword = password.toLowerCase();

  this.config.bannedWords.forEach(word => {
    if (lowerPassword.includes(word.toLowerCase())) {
      penalty += 20;
      this.feedback.push(`Avoid common words like "${word}"`);
    }
  });

  if (password.length < 12) {
    penalty += 5;
  }

  return penalty;
};

PasswordStrengthChecker.prototype.getStrengthLevel = function() {
  if (this.score >= 80) return "Very Strong";
  if (this.score >= 60) return "Strong";
  if (this.score >= 40) return "Moderate";
  if (this.score >= 20) return "Weak";
  return "Very Weak";
};

PasswordStrengthChecker.prototype.getFeedback = function() {
  return this.feedback.length > 0 ? this.feedback : ["Password meets all requirements"];
};

PasswordStrengthChecker.prototype.validate = function(password) {
  this.calculateScore(password);
  return {
    score: this.score,
    strength: this.getStrengthLevel(),
    isValid: this.score >= 60,
    feedback: this.getFeedback(),
    percentage: Math.min(100, Math.max(0, this.score))
  };
};

export default PasswordStrengthChecker;