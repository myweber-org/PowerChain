function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && 
           hasUpperCase && 
           hasLowerCase && 
           hasNumbers && 
           hasSpecialChar;
}

function validateUserInput(username, password) {
    const usernameValid = validateUsername(username);
    const passwordValid = validatePassword(password);
    
    if (!usernameValid && !passwordValid) {
        return { valid: false, message: "Invalid username and password format" };
    }
    
    if (!usernameValid) {
        return { valid: false, message: "Username must be 3-20 characters and contain only letters, numbers, and underscores" };
    }
    
    if (!passwordValid) {
        return { valid: false, message: "Password must be at least 8 characters with uppercase, lowercase, number, and special character" };
    }
    
    return { valid: true, message: "Input validation successful" };
}

export { validateUserInput, validateUsername, validatePassword };function validateUserInput(input, options = {}) {
  const defaults = {
    maxLength: 100,
    minLength: 1,
    allowEmpty: false,
    trim: true,
    allowedChars: null,
    regexPattern: null
  };
  
  const config = { ...defaults, ...options };
  
  if (typeof input !== 'string') {
    return { isValid: false, error: 'Input must be a string' };
  }
  
  let processedInput = input;
  
  if (config.trim) {
    processedInput = processedInput.trim();
  }
  
  if (!config.allowEmpty && processedInput.length === 0) {
    return { isValid: false, error: 'Input cannot be empty' };
  }
  
  if (processedInput.length < config.minLength) {
    return { 
      isValid: false, 
      error: `Input must be at least ${config.minLength} characters long` 
    };
  }
  
  if (processedInput.length > config.maxLength) {
    return { 
      isValid: false, 
      error: `Input cannot exceed ${config.maxLength} characters` 
    };
  }
  
  if (config.allowedChars && !config.allowedChars.test(processedInput)) {
    return { 
      isValid: false, 
      error: 'Input contains invalid characters' 
    };
  }
  
  if (config.regexPattern && !config.regexPattern.test(processedInput)) {
    return { 
      isValid: false, 
      error: 'Input does not match required pattern' 
    };
  }
  
  return {
    isValid: true,
    cleanedInput: processedInput,
    originalLength: input.length,
    cleanedLength: processedInput.length
  };
}