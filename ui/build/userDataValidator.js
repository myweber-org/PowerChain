function validateUserData(user) {
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

  if (user.password !== user.confirmPassword) {
    errors.push('Passwords do not match');
  }

  if (user.age && (user.age < 0 || user.age > 150)) {
    errors.push('Age must be between 0 and 150');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
}

function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validateUserData(userData) {
    const errors = {};
    
    if (!validateEmail(userData.email)) {
        errors.email = 'Invalid email format';
    }
    
    if (!validatePassword(userData.password)) {
        errors.password = 'Password must be at least 8 characters with uppercase, lowercase and number';
    }
    
    if (!validateUsername(userData.username)) {
        errors.username = 'Username must be 3-20 alphanumeric characters or underscores';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export { validateUserData, validateEmail, validatePassword, validateUsername };