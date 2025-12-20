function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateUserInput(input) {
    const sanitized = sanitizeInput(input);
    const pattern = /^[a-zA-Z0-9\s.,!?@-]{1,500}$/;
    
    if (!pattern.test(sanitized)) {
        throw new Error('Invalid input format');
    }
    
    return sanitized.trim();
}

export { validateUserInput };function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateUserInput(input) {
    const sanitized = sanitizeInput(input);
    const pattern = /^[a-zA-Z0-9\s.,!?@-]{1,500}$/;
    
    if (!pattern.test(sanitized)) {
        throw new Error('Invalid input format');
    }
    
    return sanitized.trim();
}

export { sanitizeInput, validateUserInput };