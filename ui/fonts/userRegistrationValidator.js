function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && 
           hasUpperCase && 
           hasLowerCase && 
           hasNumbers && 
           hasSpecialChar;
}

function validateRegistrationForm(userData) {
    const errors = {};
    
    if (!userData.username || userData.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters';
    }
    
    if (!validateEmail(userData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (!validatePassword(userData.password)) {
        errors.password = 'Password must be at least 8 characters with uppercase, lowercase, number and special character';
    }
    
    if (userData.password !== userData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!userData.termsAccepted) {
        errors.termsAccepted = 'You must accept the terms and conditions';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export { validateRegistrationForm, validateEmail, validatePassword };function validateRegistrationForm(formData) {
    const errors = {};
    
    if (!formData.username || formData.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters long';
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password || formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    }
    
    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.age && (formData.age < 13 || formData.age > 120)) {
        errors.age = 'Age must be between 13 and 120';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}function validateRegistrationForm(formData) {
  const errors = {};
  
  if (!formData.username || formData.username.trim().length < 3) {
    errors.username = 'Username must be at least 3 characters long';
  }
  
  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!formData.password || formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }
  
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  if (formData.age && (formData.age < 18 || formData.age > 120)) {
    errors.age = 'Age must be between 18 and 120';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  };
}function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    if (!/[!@#$%^&*]/.test(password)) return false;
    return true;
}

function validateRegistration(userData) {
    const errors = [];
    
    if (!validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePassword(userData.password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
    }
    
    if (userData.password !== userData.confirmPassword) {
        errors.push('Passwords do not match');
    }
    
    if (!userData.username || userData.username.trim().length < 3) {
        errors.push('Username must be at least 3 characters');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = { validateRegistration, validateEmail, validatePassword };