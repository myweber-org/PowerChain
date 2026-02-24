function validateFile(file, maxSize, allowedTypes) {
    if (!file) return { valid: false, error: 'No file provided' };
    
    if (file.size > maxSize) {
        return { 
            valid: false, 
            error: `File size exceeds limit of ${maxSize / 1024 / 1024}MB` 
        };
    }
    
    const fileType = file.type;
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileType) && !allowedTypes.includes(`.${fileExtension}`)) {
        return { 
            valid: false, 
            error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}` 
        };
    }
    
    return { valid: true, error: null };
}

function handleFileUpload(event, config) {
    const file = event.target.files[0];
    const validation = validateFile(file, config.maxSize, config.allowedTypes);
    
    if (!validation.valid) {
        console.error('Upload failed:', validation.error);
        return null;
    }
    
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
        reader.onload = function(e) {
            resolve({
                name: file.name,
                type: file.type,
                size: file.size,
                data: e.target.result,
                uploadedAt: new Date().toISOString()
            });
        };
        
        reader.onerror = function() {
            reject(new Error('Failed to read file'));
        };
        
        reader.readAsDataURL(file);
    });
}

const uploadConfig = {
    maxSize: 5 * 1024 * 1024,
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', '.pdf', '.txt']
};

document.getElementById('fileInput').addEventListener('change', async (event) => {
    try {
        const result = await handleFileUpload(event, uploadConfig);
        if (result) {
            console.log('File uploaded successfully:', result);
        }
    } catch (error) {
        console.error('Upload error:', error.message);
    }
});function validateFile(file, allowedTypes, maxSize) {
    const fileType = file.type;
    const fileSize = file.size;

    if (!allowedTypes.includes(fileType)) {
        throw new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
    }

    if (fileSize > maxSize) {
        throw new Error(`File size exceeds limit. Maximum size: ${maxSize} bytes`);
    }

    return true;
}

function trackUploadProgress(file, progressCallback) {
    const totalSize = file.size;
    let uploadedSize = 0;
    const chunkSize = 1024 * 1024; // 1MB chunks

    function uploadChunk() {
        const remaining = totalSize - uploadedSize;
        const currentChunkSize = Math.min(chunkSize, remaining);

        // Simulate upload progress
        setTimeout(() => {
            uploadedSize += currentChunkSize;
            const progress = (uploadedSize / totalSize) * 100;

            if (progressCallback) {
                progressCallback(progress);
            }

            if (uploadedSize < totalSize) {
                uploadChunk();
            } else {
                if (progressCallback) {
                    progressCallback(100, true);
                }
            }
        }, 100);
    }

    uploadChunk();
}

function handleFileUpload(file, options = {}) {
    const defaultOptions = {
        allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
        maxSize: 10 * 1024 * 1024, // 10MB
        onProgress: null,
        onComplete: null,
        onError: null
    };

    const config = { ...defaultOptions, ...options };

    try {
        validateFile(file, config.allowedTypes, config.maxSize);

        if (config.onProgress) {
            trackUploadProgress(file, config.onProgress);
        }

        // Simulate final upload completion
        setTimeout(() => {
            if (config.onComplete) {
                config.onComplete({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    uploadedAt: new Date().toISOString()
                });
            }
        }, 1500);

        return {
            status: 'uploading',
            fileName: file.name
        };
    } catch (error) {
        if (config.onError) {
            config.onError(error.message);
        }
        return {
            status: 'error',
            error: error.message
        };
    }
}

// Example usage
const uploadOptions = {
    allowedTypes: ['image/jpeg', 'image/png'],
    maxSize: 5 * 1024 * 1024,
    onProgress: (progress, isComplete) => {
        console.log(`Upload progress: ${progress.toFixed(2)}%`);
        if (isComplete) {
            console.log('Upload completed successfully');
        }
    },
    onComplete: (fileInfo) => {
        console.log('File uploaded:', fileInfo);
    },
    onError: (errorMessage) => {
        console.error('Upload failed:', errorMessage);
    }
};