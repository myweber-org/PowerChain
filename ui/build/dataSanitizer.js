function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateAndSanitizeUserInput(userInput) {
    if (typeof userInput !== 'string') {
        return '';
    }
    
    const trimmedInput = userInput.trim();
    const sanitizedInput = sanitizeInput(trimmedInput);
    
    const allowedPattern = /^[a-zA-Z0-9\s.,!?@-]+$/;
    if (!allowedPattern.test(trimmedInput)) {
        console.warn('Input contains potentially dangerous characters');
        return '';
    }
    
    return sanitizedInput;
}

export { validateAndSanitizeUserInput };function sanitizeInput(input) {
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
    
    const regex = /^[a-zA-Z0-9\s.,!?-]+$/;
    if (!regex.test(sanitized)) {
        return '';
    }
    
    return sanitized;
}

export { validateAndSanitize };