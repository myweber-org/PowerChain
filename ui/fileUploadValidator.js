function validateFileUpload(file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.');
    }
    
    if (file.size > maxSize) {
        throw new Error('File size exceeds 5MB limit.');
    }
    
    return {
        name: file.name,
        type: file.type,
        size: file.size,
        isValid: true
    };
}function validateFileUpload(file, allowedTypes, maxSize) {
    if (!file || !allowedTypes || !maxSize) {
        throw new Error('Missing required parameters for file validation');
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
        fileName: file.name,
        fileSize: fileSize,
        fileType: fileExtension
    };
}

function handleFileSelect(event, callback) {
    const file = event.target.files[0];
    const allowedTypes = ['.jpg', '.jpeg', '.png', '.gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    try {
        const validationResult = validateFileUpload(file, allowedTypes, maxSize);
        callback(validationResult);
    } catch (error) {
        callback({
            valid: false,
            error: error.message
        });
    }
}