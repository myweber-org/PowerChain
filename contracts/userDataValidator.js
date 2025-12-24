function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validateUserInput(email, password) {
    const errors = [];
    
    if (!validateEmail(email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePassword(password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase, number and special character');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = { validateUserInput, validateEmail, validatePassword };function validateUserData(user) {
  const errors = [];

  if (!user.username || user.username.trim().length < 3) {
    errors.push('Username must be at least 3 characters long');
  }

  if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.push('Please provide a valid email address');
  }

  if (!user.password || user.password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (user.password && user.password === user.username) {
    errors.push('Password cannot be the same as username');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}