function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }
  
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

function validateAndSanitizeForm() {
  const userInput = document.getElementById('userInput').value;
  const sanitizedInput = sanitizeInput(userInput);
  
  document.getElementById('output').innerHTML = sanitizedInput;
  console.log('Sanitized input:', sanitizedInput);
  
  return false;
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('inputForm');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      validateAndSanitizeForm();
    });
  }
});function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateAndSanitizeUserInput(userInput) {
    if (typeof userInput !== 'string') {
        return '';
    }
    
    const trimmedInput = userInput.trim();
    const sanitized = sanitizeInput(trimmedInput);
    
    const allowedPattern = /^[a-zA-Z0-9\s.,!?@-]+$/;
    if (!allowedPattern.test(trimmedInput)) {
        console.warn('Input contains potentially dangerous characters');
        return '';
    }
    
    return sanitized;
}

export { validateAndSanitizeUserInput };