function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhoneNumber(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function validateInput(input, type) {
    if (type === 'email') {
        return validateEmail(input);
    } else if (type === 'phone') {
        return validatePhoneNumber(input);
    }
    return false;
}

module.exports = {
    validateEmail,
    validatePhoneNumber,
    validateInput
};
function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }
  
  const trimmed = input.trim();
  const escaped = trimmed
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
    
  return escaped.substring(0, 255);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/\d/.test(password)) return false;
  return true;
}

export { sanitizeInput, validateEmail, validatePassword };function validateEmail(email) {
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

function sanitizeInput(input) {
    return input.trim()
                .replace(/[<>]/g, '')
                .substring(0, 255);
}

module.exports = {
    validateEmail,
    validatePassword,
    sanitizeInput
};function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhone(phone) {
    const regex = /^\+?[\d\s\-\(\)]{10,}$/;
    return regex.test(phone);
}

function sanitizeInput(input) {
    return input.trim().replace(/[<>]/g, '');
}

function validateForm(data) {
    const errors = [];
    
    if (!validateEmail(data.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePhone(data.phone)) {
        errors.push('Invalid phone number');
    }
    
    if (data.name.length < 2) {
        errors.push('Name must be at least 2 characters');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        sanitizedData: {
            name: sanitizeInput(data.name),
            email: data.email.toLowerCase(),
            phone: data.phone.replace(/\D/g, '')
        }
    };
}

export { validateEmail, validatePhone, sanitizeInput, validateForm };function validateEmail(email) {
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
    return username.length >= 3 && 
           username.length <= 20 && 
           /^[a-zA-Z0-9_]+$/.test(username);
}

function validateRegistrationData(userData) {
    const errors = [];
    
    if (!validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePassword(userData.password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase and number');
    }
    
    if (!validateUsername(userData.username)) {
        errors.push('Username must be 3-20 characters (letters, numbers, underscores only)');
    }
    
    if (userData.password !== userData.confirmPassword) {
        errors.push('Passwords do not match');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateRegistrationData, validateEmail, validatePassword, validateUsername };