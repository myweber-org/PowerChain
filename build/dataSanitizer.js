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
    const maxLength = 500;
    
    if (sanitized.length > maxLength) {
        return sanitized.substring(0, maxLength);
    }
    
    return sanitized;
}

export { validateAndSanitize, sanitizeInput };