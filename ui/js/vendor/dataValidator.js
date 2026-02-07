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

function sanitizeInput(input) {
    return input.trim()
                .replace(/[<>]/g, '')
                .substring(0, 255);
}

module.exports = {
    validateEmail,
    validatePassword,
    sanitizeInput
};function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 8 && 
         /[A-Z]/.test(password) && 
         /[0-9]/.test(password);
}

function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

function validateRegistrationForm(userData) {
  const errors = [];
  
  if (!validateUsername(userData.username)) {
    errors.push('Username must be 3-20 characters (letters, numbers, underscores)');
  }
  
  if (!validateEmail(userData.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!validatePassword(userData.password)) {
    errors.push('Password must be at least 8 characters with one uppercase letter and one number');
  }
  
  if (userData.password !== userData.confirmPassword) {
    errors.push('Passwords do not match');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

export { validateRegistrationForm, validateEmail, validatePassword, validateUsername };