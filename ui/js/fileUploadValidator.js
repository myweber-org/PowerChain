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

export { validateFileUpload, handleFileSelect };function validateFileUpload(file, maxSizeMB = 5) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (!file) {
        return { isValid: false, message: 'No file selected' };
    }

    if (!allowedTypes.includes(file.type)) {
        return { isValid: false, message: 'Invalid file type. Allowed: JPEG, PNG, GIF, WEBP' };
    }

    if (file.size > maxSizeBytes) {
        return { isValid: false, message: `File size exceeds ${maxSizeMB}MB limit` };
    }

    return { isValid: true, message: 'File validation passed' };
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    const validationResult = validateFileUpload(file);

    const statusElement = document.getElementById('uploadStatus');
    if (!validationResult.isValid) {
        statusElement.textContent = `Error: ${validationResult.message}`;
        statusElement.className = 'error';
        event.target.value = '';
        return false;
    }

    statusElement.textContent = validationResult.message;
    statusElement.className = 'success';
    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }
});