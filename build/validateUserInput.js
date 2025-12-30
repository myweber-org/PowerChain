function validateUserInput(username, email) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernameRegex.test(username)) {
        return {
            valid: false,
            message: 'Username must be 3-20 characters and contain only letters, numbers, and underscores.'
        };
    }

    if (!emailRegex.test(email)) {
        return {
            valid: false,
            message: 'Please enter a valid email address.'
        };
    }

    return {
        valid: true,
        message: 'Input validation successful.'
    };
}function validateUserInput(input, options = {}) {
  const defaults = {
    maxLength: 255,
    allowHTML: false,
    trim: true,
    allowedPattern: null
  };
  
  const config = { ...defaults, ...options };
  
  if (typeof input !== 'string') {
    return '';
  }
  
  let processed = input;
  
  if (config.trim) {
    processed = processed.trim();
  }
  
  if (processed.length > config.maxLength) {
    processed = processed.substring(0, config.maxLength);
  }
  
  if (!config.allowHTML) {
    processed = processed.replace(/[<>]/g, '');
  }
  
  if (config.allowedPattern && config.allowedPattern instanceof RegExp) {
    const match = processed.match(config.allowedPattern);
    processed = match ? match[0] : '';
  }
  
  return processed;
}function validateUserInput(username, password) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!usernameRegex.test(username)) {
        throw new Error('Username must be 3-20 characters and contain only letters, numbers, and underscores.');
    }

    if (!passwordRegex.test(password)) {
        throw new Error('Password must be at least 8 characters with at least one letter and one number.');
    }

    return true;
}