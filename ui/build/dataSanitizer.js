function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateAndSanitize(userInput) {
    if (typeof userInput !== 'string') {
        return '';
    }
    
    const trimmedInput = userInput.trim();
    if (trimmedInput.length === 0) {
        return '';
    }
    
    const sanitized = sanitizeInput(trimmedInput);
    const dangerousPatterns = /<script|javascript:|on\w+\s*=/i;
    
    if (dangerousPatterns.test(sanitized)) {
        console.warn('Potentially dangerous input detected and neutralized');
        return sanitized.replace(dangerousPatterns, match => {
            return match.replace(/./g, '�');
        });
    }
    
    return sanitized;
}

export { validateAndSanitize };function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateAndSanitizeUserInput(userInput) {
    if (typeof userInput !== 'string') {
        return '';
    }
    
    const trimmedInput = userInput.trim();
    if (trimmedInput.length === 0) {
        return '';
    }
    
    const sanitized = sanitizeInput(trimmedInput);
    const maxLength = 500;
    
    if (sanitized.length > maxLength) {
        return sanitized.substring(0, maxLength);
    }
    
    return sanitized;
}

export { validateAndSanitizeUserInput };function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}

function validateAndSanitizeUserInput(userInput, maxLength = 1000) {
    if (!userInput || typeof userInput !== 'string') {
        return '';
    }
    
    const trimmedInput = userInput.trim();
    
    if (trimmedInput.length > maxLength) {
        return sanitizeInput(trimmedInput.substring(0, maxLength));
    }
    
    return sanitizeInput(trimmedInput);
}

export { sanitizeInput, validateAndSanitizeUserInput };