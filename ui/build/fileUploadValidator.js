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
}function validateFileUpload(file, allowedTypes, maxSize) {
    if (!file || !allowedTypes.includes(file.type)) {
        return { valid: false, error: 'Invalid file type' };
    }
    
    if (file.size > maxSize) {
        return { valid: false, error: 'File size exceeds limit' };
    }
    
    return { valid: true, error: null };
}

function handleFileSelect(event, callback) {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    const validation = validateFileUpload(file, allowedTypes, maxSize);
    
    if (validation.valid) {
        callback(null, file);
    } else {
        callback(validation.error, null);
    }
}

export { validateFileUpload, handleFileSelect };function validateFileUpload(file, options = {}) {
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
            error: `File too large. Maximum size: ${settings.maxSize / 1024 / 1024}MB` 
        };
    }

    if (file.size < settings.minSize) {
        return { 
            valid: false, 
            error: `File too small. Minimum size: ${settings.minSize / 1024}KB` 
        };
    }

    return { valid: true, file };
}

function createFileUploadHandler(validationOptions) {
    return function(event) {
        const fileInput = event.target;
        const file = fileInput.files[0];
        
        const validationResult = validateFileUpload(file, validationOptions);
        
        if (!validationResult.valid) {
            console.error('Upload failed:', validationResult.error);
            fileInput.value = '';
            return false;
        }
        
        console.log('File validated successfully:', validationResult.file.name);
        return true;
    };
}

const imageUploadHandler = createFileUploadHandler({
    allowedTypes: ['image/jpeg', 'image/png'],
    maxSize: 10 * 1024 * 1024
});

document.addEventListener('DOMContentLoaded', function() {
    const uploadInput = document.getElementById('fileUpload');
    if (uploadInput) {
        uploadInput.addEventListener('change', imageUploadHandler);
    }
});function validateFileUpload(file, allowedTypes, maxSizeMB) {
    if (!file || !allowedTypes || !maxSizeMB) {
        throw new Error('Missing required parameters for file validation.');
    }

    const fileExtension = file.name.split('.').pop().toLowerCase();
    const isValidType = allowedTypes.some(type => fileExtension === type.toLowerCase());

    if (!isValidType) {
        return { valid: false, error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}` };
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
        return { valid: false, error: `File size exceeds limit of ${maxSizeMB}MB` };
    }

    return { valid: true, error: null };
}