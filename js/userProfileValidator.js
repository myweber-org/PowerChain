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

export { validateUserProfile, validateEmail, validatePhoneNumber };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function validateUsername(username) {
    if (username.length < 3 || username.length > 20) {
        return false;
    }
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return usernameRegex.test(username);
}

function validateProfileData(userData) {
    const errors = {};
    
    if (!validateEmail(userData.email)) {
        errors.email = 'Invalid email format';
    }
    
    if (!validatePhone(userData.phone)) {
        errors.phone = 'Invalid phone number';
    }
    
    if (!validateUsername(userData.username)) {
        errors.username = 'Username must be 3-20 characters and contain only letters, numbers, and underscores';
    }
    
    if (userData.age && (userData.age < 13 || userData.age > 120)) {
        errors.age = 'Age must be between 13 and 120';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export { validateProfileData, validateEmail, validatePhone, validateUsername };