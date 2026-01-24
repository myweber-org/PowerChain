function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}

function validateAndSanitize(userInput, maxLength = 1000) {
    if (!userInput || userInput.trim().length === 0) {
        return '';
    }
    
    const trimmed = userInput.trim();
    if (trimmed.length > maxLength) {
        return trimmed.substring(0, maxLength);
    }
    
    return sanitizeInput(trimmed);
}

export { sanitizeInput, validateAndSanitize };