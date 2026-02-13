function validateFile(file, maxSize) {
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
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
    };
}

function createUploadForm() {
    const form = document.createElement('form');
    form.id = 'uploadForm';
    form.enctype = 'multipart/form-data';

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.name = 'fileUpload';
    fileInput.accept = '.jpg,.jpeg,.png,.pdf';

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Upload File';

    form.appendChild(fileInput);
    form.appendChild(submitButton);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const file = fileInput.files[0];
        try {
            const validatedFile = validateFile(file, 5 * 1024 * 1024);
            console.log('File validated:', validatedFile);
            // Proceed with upload logic
        } catch (error) {
            console.error('Validation error:', error.message);
            alert(error.message);
        }
    });

    return form;
}

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('uploadContainer');
    if (container) {
        container.appendChild(createUploadForm());
    }
});function handleFileUpload(file, options = {}) {
    const {
        maxSize = 10 * 1024 * 1024,
        allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'],
        onProgress = () => {},
        onComplete = () => {},
        onError = () => {}
    } = options;

    return new Promise((resolve, reject) => {
        if (!file) {
            const error = new Error('No file provided');
            onError(error);
            return reject(error);
        }

        if (file.size > maxSize) {
            const error = new Error(`File size exceeds ${maxSize} bytes limit`);
            onError(error);
            return reject(error);
        }

        if (!allowedTypes.includes(file.type)) {
            const error = new Error(`File type ${file.type} not allowed`);
            onError(error);
            return reject(error);
        }

        const reader = new FileReader();
        let progress = 0;

        const progressInterval = setInterval(() => {
            if (progress < 90) {
                progress += 10;
                onProgress(progress);
            }
        }, 100);

        reader.onload = (event) => {
            clearInterval(progressInterval);
            onProgress(100);
            
            const result = {
                name: file.name,
                type: file.type,
                size: file.size,
                data: event.target.result,
                uploadedAt: new Date().toISOString()
            };
            
            onComplete(result);
            resolve(result);
        };

        reader.onerror = (error) => {
            clearInterval(progressInterval);
            onError(error);
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}

function validateFileExtension(filename, allowedExtensions = ['.jpg', '.png', '.pdf']) {
    const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
    return allowedExtensions.includes(extension);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export { handleFileUpload, validateFileExtension, formatFileSize };