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

export { validateAndSanitize };function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;'
    };
    
    const reg = /[&<>"'/]/ig;
    return input.replace(reg, (match) => map[match]);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

module.exports = {
    sanitizeInput,
    validateEmail
};