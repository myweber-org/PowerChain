const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
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

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        validateFile(file);
        console.log('File validation passed:', file.name);
    } catch (error) {
        console.error('Validation error:', error.message);
        event.target.value = '';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }
});