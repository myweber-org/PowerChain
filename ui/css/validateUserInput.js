function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }
  
  const trimmed = input.trim();
  const sanitized = trimmed.replace(/[<>]/g, '');
  
  if (sanitized.length > 100) {
    return sanitized.substring(0, 100);
  }
  
  return sanitized;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  if (password.length < 8) {
    return false;
  }
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
}

module.exports = {
  sanitizeInput,
  validateEmail,
  validatePassword
};