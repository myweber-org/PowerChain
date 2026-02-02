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
});function validateFile(file, maxSize) {
    if (!file) {
        throw new Error('No file provided');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type');
    }

    if (file.size > maxSize) {
        throw new Error('File size exceeds limit');
    }

    return {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
    };
}

function processUpload(file, options = {}) {
    const defaults = {
        maxSize: 5 * 1024 * 1024,
        onProgress: null,
        onComplete: null
    };

    const settings = { ...defaults, ...options };

    try {
        const validatedFile = validateFile(file, settings.maxSize);
        
        if (settings.onProgress) {
            settings.onProgress(0);
            setTimeout(() => settings.onProgress(50), 500);
            setTimeout(() => settings.onProgress(100), 1000);
        }

        const result = {
            success: true,
            file: validatedFile,
            timestamp: new Date().toISOString(),
            id: Math.random().toString(36).substr(2, 9)
        };

        if (settings.onComplete) {
            settings.onComplete(result);
        }

        return result;
    } catch (error) {
        return {
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        };
    }
}

const uploadManager = {
    queue: [],
    activeUploads: 0,
    maxConcurrent: 3,

    addToQueue(file, options) {
        this.queue.push({ file, options });
        this.processQueue();
    },

    processQueue() {
        while (this.activeUploads < this.maxConcurrent && this.queue.length > 0) {
            const item = this.queue.shift();
            this.activeUploads++;
            
            processUpload(item.file, {
                ...item.options,
                onComplete: (result) => {
                    this.activeUploads--;
                    if (item.options.onComplete) {
                        item.options.onComplete(result);
                    }
                    this.processQueue();
                }
            });
        }
    }
};

export { validateFile, processUpload, uploadManager };