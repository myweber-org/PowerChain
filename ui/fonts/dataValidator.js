function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhoneNumber(phone) {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

function validateFormData(data) {
  const errors = {};
  
  if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!validatePhoneNumber(data.phone)) {
    errors.phone = 'Phone number must be at least 10 digits';
  }
  
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  };
}

export { validateEmail, validatePhoneNumber, validateFormData };