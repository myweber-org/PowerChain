function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/\d/.test(password)) return false;
  return true;
}

function validateUserData(userData) {
  const errors = [];
  
  if (!validateEmail(userData.email)) {
    errors.push('Invalid email format');
  }
  
  if (!validatePassword(userData.password)) {
    errors.push('Password must be at least 8 characters with uppercase, lowercase and number');
  }
  
  if (!userData.username || userData.username.trim().length < 3) {
    errors.push('Username must be at least 3 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

export { validateUserData, validateEmail, validatePassword };