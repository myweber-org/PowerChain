function validateFileUpload(file, allowedTypes, maxSize) {
    if (!file || !allowedTypes || !maxSize) {
        throw new Error('Missing required parameters');
    }

    const fileExtension = file.name.split('.').pop().toLowerCase();
    const fileSize = file.size;
    const isValidType = allowedTypes.includes(`.${fileExtension}`);
    const isValidSize = fileSize <= maxSize;

    if (!isValidType) {
        return {
            valid: false,
            error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`
        };
    }

    if (!isValidSize) {
        return {
            valid: false,
            error: `File size exceeds limit. Maximum size: ${maxSize} bytes`
        };
    }

    return {
        valid: true,
        name: file.name,
        size: fileSize,
        type: fileExtension
    };
}