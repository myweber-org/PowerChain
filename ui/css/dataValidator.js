function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone);
}

function sanitizeInput(input) {
    return input
        .replace(/[<>]/g, '')
        .trim()
        .substring(0, 255);
}

function validatePassword(password) {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    return true;
}

module.exports = {
    validateEmail,
    validatePhone,
    sanitizeInput,
    validatePassword
};function validateEmail(email) {
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
        errors.phone = 'Invalid phone number format';
    }
    
    if (!data.name || data.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
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
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
}

function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validateRegistrationForm(userData) {
    const errors = [];
    
    if (!validateUsername(userData.username)) {
        errors.push('Username must be 3-20 characters (letters, numbers, underscores)');
    }
    
    if (!validateEmail(userData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!validatePassword(userData.password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase and number');
    }
    
    if (userData.password !== userData.confirmPassword) {
        errors.push('Passwords do not match');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateRegistrationForm, validateEmail, validatePassword, validateUsername };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function sanitizeInput(input) {
    return input.trim()
        .replace(/[<>]/g, '')
        .substring(0, 255);
}

function validateFormData(formData) {
    const errors = [];
    
    if (!validateEmail(formData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePhone(formData.phone)) {
        errors.push('Invalid phone number');
    }
    
    const sanitizedName = sanitizeInput(formData.name);
    if (sanitizedName.length < 2) {
        errors.push('Name must be at least 2 characters');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        sanitizedData: {
            name: sanitizedName,
            email: formData.email.toLowerCase(),
            phone: formData.phone.replace(/\D/g, '')
        }
    };
}

module.exports = {
    validateEmail,
    validatePhone,
    sanitizeInput,
    validateFormData
};function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function sanitizeInput(input) {
    return input.trim()
        .replace(/[<>]/g, '')
        .substring(0, 255);
}

module.exports = {
    validateEmail,
    validatePhone,
    sanitizeInput
};
function sanitizeInput(input) {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  
  const trimmed = input.trim();
  
  if (trimmed.length === 0) {
    throw new Error('Input cannot be empty after trimming');
  }
  
  const sanitized = trimmed
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .substring(0, 255);
  
  return sanitized;
}

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

function validateAge(age) {
  const numAge = Number(age);
  return Number.isInteger(numAge) && numAge >= 0 && numAge <= 150;
}

export { sanitizeInput, validateEmail, validatePassword, validateAge };