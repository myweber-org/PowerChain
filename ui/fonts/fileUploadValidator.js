function validateFileUpload(file, allowedTypes, maxSizeMB) {
    if (!file || !allowedTypes || !maxSizeMB) {
        throw new Error('Missing required parameters');
    }

    const fileExtension = file.name.split('.').pop().toLowerCase();
    const isValidType = allowedTypes.some(type => file.type.includes(type) || fileExtension === type);
    
    if (!isValidType) {
        return { valid: false, error: 'File type not allowed' };
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
        return { valid: false, error: 'File size exceeds limit' };
    }

    return { valid: true, error: null };
}