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

export { validateEmail, validatePhoneNumber, validateFormData };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
}

function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validateRegistrationForm(userData) {
    const errors = {};
    
    if (!validateEmail(userData.email)) {
        errors.email = 'Invalid email format';
    }
    
    if (!validatePassword(userData.password)) {
        errors.password = 'Password must be at least 8 characters with one uppercase letter and one number';
    }
    
    if (!validateUsername(userData.username)) {
        errors.username = 'Username must be 3-20 characters (letters, numbers, underscores only)';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export { validateEmail, validatePassword, validateUsername, validateRegistrationForm };