function validateUserData(user) {
  const errors = [];

  if (!user.username || user.username.trim().length < 3) {
    errors.push('Username must be at least 3 characters long');
  }

  if (!user.email || !user.email.includes('@')) {
    errors.push('Valid email address is required');
  }

  if (!user.password || user.password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (user.age && (user.age < 0 || user.age > 150)) {
    errors.push('Age must be between 0 and 150');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}