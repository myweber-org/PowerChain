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
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    
    try {
        const validationResult = validateFileUpload(file);
        console.log('File validation passed:', validationResult);
        // Proceed with upload logic here
    } catch (error) {
        console.error('Validation failed:', error.message);
        // Display error to user
        alert(error.message);
        event.target.value = ''; // Clear file input
    }
}

// Example usage with event listener
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }
});