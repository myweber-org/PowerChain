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
};function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateAndSanitizeForm() {
    const userInput = document.getElementById('userInput').value;
    const sanitizedInput = sanitizeInput(userInput);
    document.getElementById('output').innerHTML = sanitizedInput;
    console.log('Sanitized input:', sanitizedInput);
}function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateAndSanitizeUserInput(userInput) {
    if (typeof userInput !== 'string') {
        return '';
    }
    
    const trimmedInput = userInput.trim();
    if (trimmedInput.length === 0) {
        return '';
    }
    
    const sanitized = sanitizeInput(trimmedInput);
    const maxLength = 500;
    
    if (sanitized.length > maxLength) {
        return sanitized.substring(0, maxLength);
    }
    
    return sanitized;
}

export { validateAndSanitizeUserInput };function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateAndSanitize(userInput) {
    if (typeof userInput !== 'string') {
        return '';
    }
    
    const trimmed = userInput.trim();
    const sanitized = sanitizeInput(trimmed);
    
    const regex = /^[a-zA-Z0-9\s.,!?-]*$/;
    if (!regex.test(sanitized)) {
        return '';
    }
    
    return sanitized;
}

export { validateAndSanitize };function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateAndSanitizeUserInput(userInput) {
    if (typeof userInput !== 'string') {
        return '';
    }
    
    const trimmedInput = userInput.trim();
    if (trimmedInput.length === 0) {
        return '';
    }
    
    const sanitized = sanitizeInput(trimmedInput);
    const maxLength = 500;
    
    return sanitized.length > maxLength ? sanitized.substring(0, maxLength) : sanitized;
}

export { validateAndSanitizeUserInput };