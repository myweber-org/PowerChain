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

  if (user.age && (user.age < 18 || user.age > 120)) {
    errors.push('Age must be between 18 and 120');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}function validateUserData(user) {
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

    if (user.age && (user.age < 18 || user.age > 120)) {
        errors.push('Age must be between 18 and 120');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}