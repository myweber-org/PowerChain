function validateUserInput(input) {
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }
    
    const trimmed = input.trim();
    if (trimmed.length === 0) {
        throw new Error('Input cannot be empty or whitespace only');
    }
    
    const sanitized = trimmed.replace(/[<>]/g, '');
    return sanitized;
}