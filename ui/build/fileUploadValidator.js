function validateFileUpload(file, options = {}) {
    const defaultOptions = {
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
        maxSize: 5 * 1024 * 1024,
        minSize: 1024
    };

    const settings = { ...defaultOptions, ...options };

    if (!file) {
        return { valid: false, error: 'No file provided' };
    }

    if (!settings.allowedTypes.includes(file.type)) {
        return { 
            valid: false, 
            error: `File type not allowed. Allowed types: ${settings.allowedTypes.join(', ')}` 
        };
    }

    if (file.size > settings.maxSize) {
        return { 
            valid: false, 
            error: `File size exceeds maximum limit of ${settings.maxSize / 1024 / 1024}MB` 
        };
    }

    if (file.size < settings.minSize) {
        return { 
            valid: false, 
            error: `File size is below minimum limit of ${settings.minSize / 1024}KB` 
        };
    }

    return { valid: true, file };
}