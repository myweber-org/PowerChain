
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

function validatePhoneNumber(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function validateInput(input, type) {
    if (!input || typeof input !== 'string') {
        return false;
    }
    
    const trimmedInput = input.trim();
    
    switch(type) {
        case 'email':
            return validateEmail(trimmedInput);
        case 'phone':
            return validatePhoneNumber(trimmedInput);
        default:
            return trimmedInput.length > 0;
    }
}

export { validateEmail, validatePhoneNumber, validateInput };