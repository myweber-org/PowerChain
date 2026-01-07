function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhoneNumber(phone) {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

function validateUserProfile(user) {
  const errors = [];
  
  if (!user.name || user.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!validateEmail(user.email)) {
    errors.push('Invalid email format');
  }
  
  if (!validatePhoneNumber(user.phone)) {
    errors.push('Invalid phone number format');
  }
  
  if (user.age && (user.age < 18 || user.age > 120)) {
    errors.push('Age must be between 18 and 120');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

export { validateUserProfile, validateEmail, validatePhoneNumber };