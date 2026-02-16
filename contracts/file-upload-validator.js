function validateFileUpload(file, maxSize, allowedTypes) {
    if (!file) {
        return { valid: false, error: 'No file provided' };
    }

    if (file.size > maxSize) {
        return { valid: false, error: 'File size exceeds limit' };
    }

    const fileType = file.type;
    if (!allowedTypes.includes(fileType)) {
        return { valid: false, error: 'File type not allowed' };
    }

    return { valid: true, error: null };
}

function handleFileSelect(event, maxSize, allowedTypes) {
    const selectedFile = event.target.files[0];
    const validationResult = validateFileUpload(selectedFile, maxSize, allowedTypes);
    
    if (!validationResult.valid) {
        alert(validationResult.error);
        event.target.value = '';
        return null;
    }
    
    return selectedFile;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    
    if (fileInput) {
        fileInput.addEventListener('change', function(event) {
            handleFileSelect(event, MAX_FILE_SIZE, ALLOWED_FILE_TYPES);
        });
    }
});