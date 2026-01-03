function validateFileUpload(file, allowedTypes, maxSize) {
    if (!file) {
        return { valid: false, error: 'No file provided' };
    }

    const fileExtension = file.name.split('.').pop().toLowerCase();
    const isValidType = allowedTypes.some(type => fileExtension === type.toLowerCase());

    if (!isValidType) {
        return { valid: false, error: 'Invalid file type' };
    }

    if (file.size > maxSize) {
        return { valid: false, error: 'File size exceeds limit' };
    }

    return { valid: true, error: null };
}

function handleFileSelect(event, callback) {
    const file = event.target.files[0];
    const allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const validationResult = validateFileUpload(file, allowedTypes, maxSize);

    if (validationResult.valid) {
        callback(null, file);
    } else {
        callback(validationResult.error, null);
    }
}