function passwordStrengthChecker(password, options = {}) {
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
    const strengthLevel = getStrengthLevel(strengthScore);
    
    if (strengthScore < 70) {
      suggestions.push("Consider using a longer password or adding more character variety");
    }
    
    return {
      isValid: true,
      strengthScore,
      strengthLevel,
      suggestions
    };
  }
  
  return {
    isValid: false,
    errors,
    suggestions: ["Try mixing uppercase, lowercase, numbers and special characters"]
  };
}

function calculateStrengthScore(password) {
  let score = 0;
  const length = password.length;
  
  score += Math.min(length * 4, 40);
  
  const charTypes = {
    uppercase: /[A-Z]/g,
    lowercase: /[a-z]/g,
    numbers: /\d/g,
    special: /[^A-Za-z0-9]/g
  };
  
  let typeCount = 0;
  for (const type in charTypes) {
    if (charTypes[type].test(password)) {
      typeCount++;
      charTypes[type].lastIndex = 0;
    }
  }
  
  score += (typeCount - 1) * 15;
  
  const uniqueChars = new Set(password).size;
  score += Math.min((uniqueChars / length) * 20, 20);
  
  const commonPatterns = [/123/, /abc/, /qwerty/, /password/, /admin/, /letmein/];
  if (commonPatterns.some(pattern => pattern.test(password.toLowerCase()))) {
    score -= 30;
  }
  
  return Math.max(0, Math.min(100, score));
}

function getStrengthLevel(score) {
  if (score >= 80) return "strong";
  if (score >= 60) return "moderate";
  if (score >= 40) return "weak";
  return "very weak";
}