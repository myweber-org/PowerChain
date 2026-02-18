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

export { validateUserProfile, validateEmail, validatePhoneNumber };function validateUserProfile(data) {
    const errors = {};
    
    if (!data.username || data.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters';
    }
    
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Valid email is required';
    }
    
    if (data.age && (data.age < 0 || data.age > 150)) {
        errors.age = 'Age must be between 0 and 150';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

module.exports = { validateUserProfile };