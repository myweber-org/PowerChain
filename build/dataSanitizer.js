function sanitizeInput(input) {
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
  
  const pattern = /^[a-zA-Z0-9\s.,!?@'-]+$/;
  if (!pattern.test(sanitized)) {
    return '';
  }
  
  return sanitized;
}

export { validateAndSanitize };function sanitizeInput(input) {
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
    
    const reg = /[&<>"'/]/gi;
    return input.replace(reg, (match) => map[match]);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

export { sanitizeInput, validateEmail, escapeHtml };function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export { sanitizeInput, validateEmail, escapeHtml };function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

export { sanitizeInput, validateEmail, escapeHtml };function sanitizeInput(input) {
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
    
    const trimmedInput = userInput.trim();
    if (trimmedInput.length > maxLength) {
        return trimmedInput.substring(0, maxLength);
    }
    
    return sanitizeInput(trimmedInput);
}

module.exports = {
    sanitizeInput,
    validateAndSanitize
};