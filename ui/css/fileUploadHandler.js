function validateFile(file, maxSize) {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.');
    }
    
    if (file.size > maxSize) {
        throw new Error(`File size exceeds the limit of ${maxSize / 1024 / 1024}MB.`);
    }
    
    return {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
    };
}

function handleFileUpload(event, maxSize = 5 * 1024 * 1024) {
    const file = event.target.files[0];
    
    if (!file) {
        console.warn('No file selected.');
        return null;
    }
    
    try {
        const validatedFile = validateFile(file, maxSize);
        console.log('File validated successfully:', validatedFile);
        return validatedFile;
    } catch (error) {
        console.error('File validation failed:', error.message);
        alert(error.message);
        event.target.value = '';
        return null;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    
    if (fileInput) {
        fileInput.addEventListener('change', function(event) {
            handleFileUpload(event);
        });
    }
});