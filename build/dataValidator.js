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
};