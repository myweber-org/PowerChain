function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateUserInput(input) {
    const sanitized = sanitizeInput(input);
    const pattern = /^[a-zA-Z0-9\s.,!?@-]{1,500}$/;
    
    if (!pattern.test(sanitized)) {
        throw new Error('Invalid input format');
    }
    
    return sanitized.trim();
}

export { validateUserInput };function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateUserInput(input) {
    const sanitized = sanitizeInput(input);
    const pattern = /^[a-zA-Z0-9\s.,!?@-]{1,500}$/;
    
    if (!pattern.test(sanitized)) {
        throw new Error('Invalid input format');
    }
    
    return sanitized.trim();
}

export { sanitizeInput, validateUserInput };function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  
  const reg = /[&<>"'/]/ig;
  return input.replace(reg, (match) => map[match]);
}

function validateAndSanitize(userInput, maxLength = 1000) {
  if (!userInput || typeof userInput !== 'string') {
    return '';
  }
  
  const trimmed = userInput.trim();
  if (trimmed.length > maxLength) {
    return sanitizeInput(trimmed.substring(0, maxLength));
  }
  
  return sanitizeInput(trimmed);
}

module.exports = {
  sanitizeInput,
  validateAndSanitize
};