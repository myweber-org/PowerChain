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
    
    if (data.email && !validateEmail(data.email)) {
        errors.email = 'Invalid email format';
    }
    
    if (data.phone && !validatePhoneNumber(data.phone)) {
        errors.phone = 'Invalid phone number format';
    }
    
    if (data.requiredField && data.requiredField.trim() === '') {
        errors.requiredField = 'This field is required';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export { validateEmail, validatePhoneNumber, validateFormData };function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhoneNumber(phone) {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

function validateFormData(data) {
  const errors = {};

  if (data.email && !validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (data.phone && !validatePhoneNumber(data.phone)) {
    errors.phone = 'Invalid phone number format';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  };
}

export { validateEmail, validatePhoneNumber, validateFormData };