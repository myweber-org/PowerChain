function validateFile(file, maxSize) {
    if (!file) {
        throw new Error('No file provided');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed');
    }

    if (file.size > maxSize) {
        throw new Error(`File size exceeds limit of ${maxSize} bytes`);
    }

    return {
        name: file.name,
        type: file.type,
        size: file.size,
        isValid: true
    };
}

function handleFileUpload(event, maxSize = 5 * 1024 * 1024) {
    try {
        const file = event.target.files[0];
        const validationResult = validateFile(file, maxSize);
        
        console.log('File validation successful:', validationResult);
        return validationResult;
    } catch (error) {
        console.error('File validation failed:', error.message);
        return {
            isValid: false,
            error: error.message
        };
    }
}

const uploadForm = document.getElementById('uploadForm');
if (uploadForm) {
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const fileInput = document.getElementById('fileInput');
        const result = handleFileUpload({ target: fileInput });
        
        if (result.isValid) {
            alert(`File "${result.name}" is ready for upload`);
        } else {
            alert(`Upload failed: ${result.error}`);
        }
    });
}