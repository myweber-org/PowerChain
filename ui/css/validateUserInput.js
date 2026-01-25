
function validateUserInput(input, options = {}) {
  const {
    minLength = 1,
    maxLength = 100,
    allowNumbers = true,
    allowLetters = true,
    allowSpaces = true,
    allowedSpecialChars = '',
    trim = true
  } = options;

  if (typeof input !== 'string') {
    return { isValid: false, error: 'Input must be a string' };
  }

  let processedInput = input;
  if (trim) {
    processedInput = processedInput.trim();
  }

  if (processedInput.length < minLength) {
    return { 
      isValid: false, 
      error: `Input must be at least ${minLength} characters long` 
    };
  }

  if (processedInput.length > maxLength) {
    return { 
      isValid: false, 
      error: `Input must not exceed ${maxLength} characters` 
    };
  }

  const charPattern = [];
  if (allowLetters) charPattern.push('a-zA-Z');
  if (allowNumbers) charPattern.push('0-9');
  if (allowSpaces) charPattern.push('\\s');
  if (allowedSpecialChars) charPattern.push(allowedSpecialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  const patternStr = charPattern.length > 0 ? `[${charPattern.join('')}]+` : '.+';
  const regex = new RegExp(`^${patternStr}$`);

  if (!regex.test(processedInput)) {
    return { 
      isValid: false, 
      error: 'Input contains invalid characters' 
    };
  }

  return { 
    isValid: true, 
    cleanedInput: processedInput,
    length: processedInput.length
  };
}

function sanitizeHTML(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

export { validateUserInput, sanitizeHTML };