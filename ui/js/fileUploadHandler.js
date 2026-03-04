function uploadFile(file, url, onProgress, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);

    xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            if (typeof onProgress === 'function') {
                onProgress(percentComplete);
            }
        }
    });

    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            if (typeof onSuccess === 'function') {
                onSuccess(xhr.responseText);
            }
        } else {
            if (typeof onError === 'function') {
                onError(new Error(`Upload failed with status: ${xhr.status}`));
            }
        }
    });

    xhr.addEventListener('error', () => {
        if (typeof onError === 'function') {
            onError(new Error('Network error during upload'));
        }
    });

    xhr.open('POST', url, true);
    xhr.send(formData);
}function validateFile(file, maxSize) {
    if (!file) {
        throw new Error('No file provided');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.');
    }

    if (file.size > maxSize) {
        throw new Error(`File size exceeds limit of ${maxSize} bytes`);
    }

    return {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
    };
}

function handleFileUpload(event, maxSize = 5 * 1024 * 1024) {
    try {
        const file = event.target.files[0];
        const validatedFile = validateFile(file, maxSize);
        
        console.log('File validated successfully:', validatedFile);
        return validatedFile;
    } catch (error) {
        console.error('File validation failed:', error.message);
        event.target.value = '';
        throw error;
    }
}

function createFileUploader(options = {}) {
    const defaultOptions = {
        maxSize: 5 * 1024 * 1024,
        allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
        onSuccess: (file) => console.log('Upload successful:', file),
        onError: (error) => console.error('Upload failed:', error)
    };

    const config = { ...defaultOptions, ...options };

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = config.allowedTypes.join(',');
    input.style.display = 'none';

    input.addEventListener('change', (event) => {
        try {
            const file = event.target.files[0];
            const validatedFile = validateFile(file, config.maxSize);
            config.onSuccess(validatedFile);
        } catch (error) {
            config.onError(error);
            event.target.value = '';
        }
    });

    return {
        element: input,
        trigger: () => input.click(),
        destroy: () => {
            if (input.parentNode) {
                input.parentNode.removeChild(input);
            }
        }
    };
}

export { validateFile, handleFileUpload, createFileUploader };