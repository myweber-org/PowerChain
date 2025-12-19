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

export { validateAndSanitizeUserInput };