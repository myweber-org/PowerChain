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
    const files = Array.from(event.target.files);
    const validFiles = [];
    const errors = [];
    
    files.forEach(file => {
        try {
            const validatedFile = validateFile(file, maxSize);
            validFiles.push(validatedFile);
        } catch (error) {
            errors.push({
                fileName: file.name,
                error: error.message
            });
        }
    });
    
    return {
        validFiles,
        errors,
        totalProcessed: files.length
    };
}

function createFilePreview(file) {
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
        reader.onload = function(e) {
            resolve({
                name: file.name,
                url: e.target.result,
                size: file.size
            });
        };
        
        reader.onerror = function() {
            reject(new Error('Failed to read file'));
        };
        
        if (file.type.startsWith('image/')) {
            reader.readAsDataURL(file);
        } else {
            resolve({
                name: file.name,
                url: null,
                size: file.size
            });
        }
    });
}

export { validateFile, handleFileUpload, createFilePreview };