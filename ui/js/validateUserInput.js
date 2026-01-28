
function validateUserInput(input, options = {}) {
  const defaults = {
    maxLength: 255,
    minLength: 1,
    allowSpecialChars: false,
    trim: true,
    required: true
  };
  
  const config = { ...defaults, ...options };
  
  if (config.trim) {
    input = input.trim();
  }
  
  if (config.required && !input) {
    return {
      isValid: false,
      message: 'Input is required',
      sanitized: ''
    };
  }
  
  if (input.length < config.minLength) {
    return {
      isValid: false,
      message: `Input must be at least ${config.minLength} characters`,
      sanitized: input
    };
  }
  
  if (input.length > config.maxLength) {
    return {
      isValid: false,
      message: `Input must not exceed ${config.maxLength} characters`,
      sanitized: input
    };
  }
  
  if (!config.allowSpecialChars) {
    const specialCharRegex = /[<>{}[\]]/;
    if (specialCharRegex.test(input)) {
      return {
        isValid: false,
        message: 'Input contains disallowed special characters',
        sanitized: input.replace(specialCharRegex, '')
      };
    }
  }
  
  return {
    isValid: true,
    message: 'Input is valid',
    sanitized: input
  };
}function validateUserInput(username, password) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!usernameRegex.test(username)) {
        return {
            isValid: false,
            message: "Username must be 3-20 characters and contain only letters, numbers, and underscores."
        };
    }

    if (!passwordRegex.test(password)) {
        return {
            isValid: false,
            message: "Password must be at least 8 characters with at least one letter and one number."
        };
    }

    return {
        isValid: true,
        message: "Input validation passed."
    };
}function validateUserInput(username, email) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!usernameRegex.test(username)) {
        return { valid: false, message: "Username must be 3-20 characters and contain only letters, numbers, and underscores." };
    }
    
    if (!emailRegex.test(email)) {
        return { valid: false, message: "Please enter a valid email address." };
    }
    
    return { valid: true, message: "Input is valid." };
}function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateUserInput(userData) {
    const errors = [];

    if (!validateUsername(userData.username)) {
        errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores');
    }

    if (!validateEmail(userData.email)) {
        errors.push('Please provide a valid email address');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateUserInput, validateUsername, validateEmail };function validateUsername(username) {
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
        errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores.');
    }
    
    if (!validatePassword(password)) {
        errors.push('Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateUserInput, validateUsername, validatePassword };