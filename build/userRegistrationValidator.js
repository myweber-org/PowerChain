function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return password.length >= minLength && 
         hasUpperCase && 
         hasLowerCase && 
         hasNumbers && 
         hasSpecialChar;
}

function validateRegistrationData(userData) {
  const errors = [];
  
  if (!userData.email || !validateEmail(userData.email)) {
    errors.push('Invalid email format');
  }
  
  if (!userData.password || !validatePassword(userData.password)) {
    errors.push('Password must be at least 8 characters with uppercase, lowercase, number and special character');
  }
  
  if (!userData.username || userData.username.trim().length < 3) {
    errors.push('Username must be at least 3 characters');
  }
  
  if (userData.age && (userData.age < 13 || userData.age > 120)) {
    errors.push('Age must be between 13 and 120');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

module.exports = { validateRegistrationData, validateEmail, validatePassword };