function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}

function validateAndSanitize(userInput, maxLength = 1000) {
    if (!userInput || userInput.trim().length === 0) {
        return '';
    }
    
    const trimmed = userInput.trim();
    if (trimmed.length > maxLength) {
        return trimmed.substring(0, maxLength);
    }
    
    return sanitizeInput(trimmed);
}

export { sanitizeInput, validateAndSanitize };function sanitizeInput(input) {
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

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export { sanitizeInput, validateEmail, escapeHtml };