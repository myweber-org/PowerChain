function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateAndSanitizeUserInput(userInput, maxLength = 1000) {
    if (!userInput || userInput.trim() === '') {
        return '';
    }
    
    if (userInput.length > maxLength) {
        userInput = userInput.substring(0, maxLength);
    }
    
    return sanitizeInput(userInput);
}

export { sanitizeInput, validateAndSanitizeUserInput };