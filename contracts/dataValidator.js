function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhoneNumber(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function validateFormData(userData) {
    const errors = [];
    
    if (!validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePhoneNumber(userData.phone)) {
        errors.push('Invalid phone number format');
    }
    
    if (!userData.name || userData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateEmail, validatePhoneNumber, validateFormData };function sanitizeInput(input) {
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

export { sanitizeInput, validateEmail, validatePassword };