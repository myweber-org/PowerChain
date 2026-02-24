function validateUserProfile(profile) {
  const errors = [];

  if (!profile.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
    errors.push('Invalid email format');
  }

  if (typeof profile.age !== 'number' || profile.age < 18 || profile.age > 120) {
    errors.push('Age must be between 18 and 120');
  }

  if (!profile.username || profile.username.trim().length < 3) {
    errors.push('Username must be at least 3 characters long');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

module.exports = validateUserProfile;function validateUserProfile(profile) {
    const { email, age } = profile;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isAgeValid = age >= 18 && age <= 120;
    
    return {
        isValid: isEmailValid && isAgeValid,
        errors: {
            email: isEmailValid ? null : 'Invalid email format',
            age: isAgeValid ? null : 'Age must be between 18 and 120'
        }
    };
}