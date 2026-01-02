function validateUserInput(input) {
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }
    
    const trimmed = input.trim();
    if (trimmed.length === 0) {
        throw new Error('Input cannot be empty or whitespace only');
    }
    
    const maxLength = 255;
    if (trimmed.length > maxLength) {
        throw new Error(`Input exceeds maximum length of ${maxLength} characters`);
    }
    
    const dangerousPatterns = /[<>{}[\]]/;
    if (dangerousPatterns.test(trimmed)) {
        throw new Error('Input contains potentially dangerous characters');
    }
    
    return trimmed;
}