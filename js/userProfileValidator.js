function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhoneNumber(phone) {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

function validateUserProfile(userData) {
  const errors = {};
  
  if (!userData.email || !validateEmail(userData.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!userData.phone || !validatePhoneNumber(userData.phone)) {
    errors.phone = 'Invalid phone number format';
  }
  
  if (userData.age && (userData.age < 0 || userData.age > 120)) {
    errors.age = 'Age must be between 0 and 120';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  };
}

export { validateUserProfile, validateEmail, validatePhoneNumber };