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

export { validateAndSanitize };