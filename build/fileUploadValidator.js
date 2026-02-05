function validateFileUpload(file, allowedTypes, maxSize) {
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
            error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
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
        fileInfo: {
            name: file.name,
            size: fileSize,
            type: fileExtension
        }
    };
}

function handleFileSelect(event, allowedTypes, maxSize) {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
        console.log('No file selected');
        return null;
    }

    const validationResult = validateFileUpload(selectedFile, allowedTypes, maxSize);
    
    if (validationResult.valid) {
        console.log('File validation successful:', validationResult.fileInfo);
        return selectedFile;
    } else {
        console.error('File validation failed:', validationResult.error);
        alert(validationResult.error);
        event.target.value = '';
        return null;
    }
}

const imageUploadConfig = {
    allowedTypes: ['.jpg', '.jpeg', '.png', '.gif'],
    maxSize: 5 * 1024 * 1024
};

document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', function(event) {
            handleFileSelect(event, imageUploadConfig.allowedTypes, imageUploadConfig.maxSize);
        });
    }
});const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_SIZE = 5 * 1024 * 1024;

function validateFile(file) {
    if (!ALLOWED_TYPES.includes(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
    }
    
    if (file.size > MAX_SIZE) {
        throw new Error('File size exceeds the 5MB limit.');
    }
    
    return true;
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    
    try {
        validateFile(file);
        console.log('File validation passed:', file.name);
        return file;
    } catch (error) {
        console.error('Validation error:', error.message);
        event.target.value = '';
        alert(error.message);
        return null;
    }
}

export { validateFile, handleFileUpload };