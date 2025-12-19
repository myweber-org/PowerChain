
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
      error: 'Input is required',
      sanitized: ''
    };
  }

  if (input.length < config.minLength) {
    return {
      isValid: false,
      error: `Input must be at least ${config.minLength} characters`,
      sanitized: input
    };
  }

  if (input.length > config.maxLength) {
    return {
      isValid: false,
      error: `Input must not exceed ${config.maxLength} characters`,
      sanitized: input
    };
  }

  if (!config.allowSpecialChars) {
    const specialCharRegex = /[<>{}[\]\\]/;
    if (specialCharRegex.test(input)) {
      return {
        isValid: false,
        error: 'Input contains invalid special characters',
        sanitized: input.replace(specialCharRegex, '')
      };
    }
  }

  return {
    isValid: true,
    error: null,
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
}