function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    return input.trim()
        .replace(/[<>]/g, '')
        .substring(0, 255);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /\d/.test(password);
}

module.exports = { sanitizeInput, validateEmail, validatePassword };function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validateUserInput(username, password) {
    const errors = [];
    
    if (!validateUsername(username)) {
        errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores.');
    }
    
    if (!validatePassword(password)) {
        errors.push('Password must be at least 8 characters with one uppercase, one lowercase, and one number.');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateUserInput, validateUsername, validatePassword };function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
}

function validateUserInput(username, password) {
  const usernameValid = validateUsername(username);
  const passwordValid = validatePassword(password);
  
  if (!usernameValid) {
    return { valid: false, message: 'Username must be 3-20 characters and contain only letters, numbers, and underscores' };
  }
  
  if (!passwordValid) {
    return { valid: false, message: 'Password must be at least 8 characters with uppercase, lowercase, and a number' };
  }
  
  return { valid: true, message: 'Input validation successful' };
}

module.exports = { validateUserInput, validateUsername, validatePassword };