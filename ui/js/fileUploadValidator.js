function validateFileUpload(file, maxSizeMB, allowedTypes) {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    
    if (!file || !file.type || !file.size) {
        return { valid: false, error: 'Invalid file object' };
    }
    
    if (file.size > maxSizeBytes) {
        return { 
            valid: false, 
            error: `File size exceeds ${maxSizeMB}MB limit` 
        };
    }
    
    if (!allowedTypes.includes(file.type)) {
        return { 
            valid: false, 
            error: `File type not allowed. Accepted types: ${allowedTypes.join(', ')}` 
        };
    }
    
    return { valid: true, error: null };
}

function handleFileSelect(event, options = {}) {
    const defaultOptions = {
        maxSizeMB: 5,
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif']
    };
    
    const config = { ...defaultOptions, ...options };
    const file = event.target.files[0];
    
    if (!file) {
        return { valid: false, error: 'No file selected' };
    }
    
    return validateFileUpload(file, config.maxSizeMB, config.allowedTypes);
}

export { validateFileUpload, handleFileSelect };