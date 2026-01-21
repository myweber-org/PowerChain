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
    warnings.push("Password is unusually long, consider using a passphrase instead");
  }
  
  if (/(.)\1{3,}/.test(password)) {
    warnings.push("Password contains repeating characters which reduces security");
  }
  
  const commonPatterns = ["123456", "password", "qwerty", "admin"];
  if (commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
    warnings.push("Password contains common patterns that are easy to guess");
  }
  
  const score = Math.max(0, 100 - (errors.length * 25) - (warnings.length * 5));
  let strength;
  
  if (score >= 80) strength = "strong";
  else if (score >= 60) strength = "good";
  else if (score >= 40) strength = "fair";
  else if (score >= 20) strength = "weak";
  else strength = "very weak";
  
  return {
    isValid: errors.length === 0,
    score,
    strength,
    errors,
    warnings,
    suggestions: errors.length > 0 ? [
      "Use a longer password",
      "Mix uppercase and lowercase letters",
      "Include numbers and special characters",
      "Avoid common words and patterns"
    ] : []
  };
}

function generatePassword(length = 16) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  let password = "";
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
}

export { checkPasswordStrength, generatePassword };