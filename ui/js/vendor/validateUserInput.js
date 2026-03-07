function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    return password.length >= minLength && 
           hasUpperCase && 
           hasLowerCase && 
           hasNumbers && 
           hasSpecialChar;
}

function validateUserInput(username, password) {
    const errors = [];
    
    if (!validateUsername(username)) {
        errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores');
    }
    
    if (!validatePassword(password)) {
        errors.push('Password must be at least 8 characters and contain uppercase, lowercase, numbers, and special characters');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateUsername, validatePassword, validateUserInput };function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateUserInput(username, email) {
    const errors = [];
    
    if (!validateUsername(username)) {
        errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores');
    }
    
    if (!validateEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateUsername, validateEmail, validateUserInput };
function validateUserInput(input, options = {}) {
  const defaults = {
    maxLength: 255,
    minLength: 1,
    allowSpecialChars: false,
    trim: true,
    required: true
  };
  
  const settings = { ...defaults, ...options };
  
  if (input === null || input === undefined) {
    if (settings.required) {
      return { isValid: false, error: 'Input is required' };
    }
    return { isValid: true, value: null };
  }
  
  let processedInput = String(input);
  
  if (settings.trim) {
    processedInput = processedInput.trim();
  }
  
  if (settings.required && processedInput.length === 0) {
    return { isValid: false, error: 'Input cannot be empty' };
  }
  
  if (processedInput.length < settings.minLength) {
    return { 
      isValid: false, 
      error: `Input must be at least ${settings.minLength} characters long` 
    };
  }
  
  if (processedInput.length > settings.maxLength) {
    return { 
      isValid: false, 
      error: `Input cannot exceed ${settings.maxLength} characters` 
    };
  }
  
  if (!settings.allowSpecialChars) {
    const specialCharRegex = /[<>{}[\]]/;
    if (specialCharRegex.test(processedInput)) {
      return { 
        isValid: false, 
        error: 'Input contains disallowed special characters' 
      };
    }
  }
  
  return { 
    isValid: true, 
    value: processedInput,
    length: processedInput.length
  };
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const basicValidation = validateUserInput(email, { maxLength: 320 });
  
  if (!basicValidation.isValid) {
    return basicValidation;
  }
  
  if (!emailRegex.test(basicValidation.value)) {
    return { isValid: false, error: 'Invalid email format' };
  }
  
  return { 
    isValid: true, 
    value: basicValidation.value.toLowerCase(),
    length: basicValidation.length
  };
}

function validatePassword(password, confirmPassword = null) {
  const validation = validateUserInput(password, { minLength: 8, maxLength: 128 });
  
  if (!validation.isValid) {
    return validation;
  }
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const errors = [];
  
  if (!hasUpperCase) errors.push('at least one uppercase letter');
  if (!hasLowerCase) errors.push('at least one lowercase letter');
  if (!hasNumbers) errors.push('at least one number');
  if (!hasSpecialChar) errors.push('at least one special character');
  
  if (errors.length > 0) {
    return { 
      isValid: false, 
      error: `Password must contain ${errors.join(', ')}` 
    };
  }
  
  if (confirmPassword !== null && password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }
  
  return { 
    isValid: true, 
    value: password,
    length: validation.length,
    strength: calculatePasswordStrength(password)
  };
}

function calculatePasswordStrength(password) {
  let strength = 0;
  
  if (password.length >= 12) strength += 2;
  else if (password.length >= 8) strength += 1;
  
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 1;
  if (/\d/.test(password)) strength += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
  
  if (strength >= 4) return 'strong';
  if (strength >= 3) return 'medium';
  return 'weak';
}

export { validateUserInput, validateEmail, validatePassword };function validateUserInput(username, email) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernameRegex.test(username)) {
        return {
            isValid: false,
            message: "Username must be 3-20 characters and contain only letters, numbers, and underscores."
        };
    }

    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            message: "Please provide a valid email address."
        };
    }

    return {
        isValid: true,
        message: "Input validation passed."
    };
}