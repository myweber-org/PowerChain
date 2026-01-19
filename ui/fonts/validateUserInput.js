function validateUserInput(username, email) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!usernameRegex.test(username)) {
        return { valid: false, message: "Username must be 3-20 characters and contain only letters, numbers, and underscores." };
    }
    
    if (!emailRegex.test(email)) {
        return { valid: false, message: "Please enter a valid email address." };
    }
    
    return { valid: true, message: "Input is valid." };
}
function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    
    const trimmed = input.trim();
    const sanitized = trimmed
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .replace(/\s+/g, ' ');
    
    return sanitized.substring(0, 255);
}

function validateEmail(email) {
    const sanitizedEmail = sanitizeInput(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(sanitizedEmail);
}

function validatePassword(password) {
    const sanitizedPassword = sanitizeInput(password);
    if (sanitizedPassword.length < 8) {
        return false;
    }
    
    const hasUpperCase = /[A-Z]/.test(sanitizedPassword);
    const hasLowerCase = /[a-z]/.test(sanitizedPassword);
    const hasNumbers = /\d/.test(sanitizedPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(sanitizedPassword);
    
    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
}

module.exports = {
    sanitizeInput,
    validateEmail,
    validatePassword
};function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateUserInput(username, email) {
  const errors = [];
  
  if (!validateUsername(username)) {
    errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores');
  }
  
  if (!validateEmail(email)) {
    errors.push('Please enter a valid email address');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

export { validateUsername, validateEmail, validateUserInput };