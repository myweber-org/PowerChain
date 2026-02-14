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

export { sanitizeInput, validateEmail, escapeHtml };