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

  if (user.age && (isNaN(user.age) || user.age < 0 || user.age > 150)) {
    errors.push('Age must be a valid number between 0 and 150');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

module.exports = validateUserData;