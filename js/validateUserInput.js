function validateUsername(username) {
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
        errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores.');
    }
    
    if (!validateEmail(email)) {
        errors.push('Please enter a valid email address.');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateUserInput, validateUsername, validateEmail };function validateUserInput(input, options = {}) {
    const defaults = {
        minLength: 1,
        maxLength: 255,
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
        value: processedInput,
        originalLength: input.length,
        processedLength: processedInput.length
    };
}