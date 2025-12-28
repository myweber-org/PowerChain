function validateFileUpload(fileInput) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!fileInput.files || fileInput.files.length === 0) {
        return { valid: false, error: 'No file selected' };
    }

    const file = fileInput.files[0];

    if (!allowedTypes.includes(file.type)) {
        return { valid: false, error: 'Invalid file type. Only JPEG, PNG, and GIF are allowed' };
    }

    if (file.size > maxSize) {
        return { valid: false, error: 'File size exceeds 5MB limit' };
    }

    return { valid: true, file: file };
}

function handleFileUpload(event) {
    const result = validateFileUpload(event.target);
    
    if (!result.valid) {
        console.error('Upload failed:', result.error);
        alert(result.error);
        event.target.value = '';
        return;
    }

    console.log('File validated successfully:', result.file.name);
    // Proceed with upload logic here
}

// Example usage
document.addEventListener('DOMContentLoaded', function() {
    const uploadInput = document.getElementById('fileUpload');
    if (uploadInput) {
        uploadInput.addEventListener('change', handleFileUpload);
    }
});