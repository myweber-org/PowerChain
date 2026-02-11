function validateFileUpload(file, options = {}) {
    const defaultOptions = {
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
        maxSize: 5 * 1024 * 1024, // 5MB
        minSize: 1024 // 1KB
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
            error: `File size exceeds maximum limit of ${settings.maxSize / (1024 * 1024)}MB` 
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

function createFileUploadHandler(validationOptions) {
    return function(event) {
        const file = event.target.files[0];
        const validationResult = validateFileUpload(file, validationOptions);
        
        if (!validationResult.valid) {
            console.error('Upload failed:', validationResult.error);
            event.target.value = '';
            return;
        }
        
        console.log('File validated successfully:', validationResult.file.name);
        return validationResult.file;
    };
}

const imageUploadHandler = createFileUploadHandler({
    allowedTypes: ['image/jpeg', 'image/png'],
    maxSize: 10 * 1024 * 1024
});

document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', imageUploadHandler);
    }
});