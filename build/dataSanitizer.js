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

export { validateAndSanitize };