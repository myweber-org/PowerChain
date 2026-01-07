function validateUserInput(input) {
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }
    
    const trimmedInput = input.trim();
    
    if (trimmedInput.length === 0) {
        throw new Error('Input cannot be empty or whitespace only');
    }
    
    const maxLength = 255;
    if (trimmedInput.length > maxLength) {
        throw new Error(`Input exceeds maximum length of ${maxLength} characters`);
    }
    
    const dangerousPatterns = /[<>{}[\]]/g;
    if (dangerousPatterns.test(trimmedInput)) {
        throw new Error('Input contains potentially dangerous characters');
    }
    
    return trimmedInput;
}