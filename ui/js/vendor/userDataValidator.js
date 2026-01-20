function validateUserData(userData) {
  const errors = {};
  
  if (!userData.username || userData.username.trim().length < 3) {
    errors.username = 'Username must be at least 3 characters long';
  }
  
  if (!userData.email || !isValidEmail(userData.email)) {
    errors.email = 'Please provide a valid email address';
  }
  
  if (!userData.password || userData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }
  
  if (userData.password !== userData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  };
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}