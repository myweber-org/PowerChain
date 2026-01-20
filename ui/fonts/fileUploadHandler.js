function validateFile(file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.');
    }

    if (file.size > maxSize) {
        throw new Error('File size exceeds 5MB limit.');
    }

    return true;
}

function uploadFile(file, progressCallback) {
    return new Promise((resolve, reject) => {
        if (!validateFile(file)) {
            reject(new Error('File validation failed'));
            return;
        }

        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('file', file);

        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                if (typeof progressCallback === 'function') {
                    progressCallback(percentComplete);
                }
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error(`Upload failed with status: ${xhr.status}`));
            }
        });

        xhr.addEventListener('error', () => {
            reject(new Error('Network error during upload'));
        });

        xhr.open('POST', '/api/upload');
        xhr.send(formData);
    });
}

function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    
    files.forEach((file, index) => {
        try {
            validateFile(file);
            
            uploadFile(file, (progress) => {
                console.log(`File ${index + 1}: ${progress.toFixed(2)}% uploaded`);
            })
            .then((response) => {
                console.log(`File ${index + 1} uploaded successfully:`, response);
            })
            .catch((error) => {
                console.error(`File ${index + 1} upload failed:`, error.message);
            });
            
        } catch (error) {
            console.error(`File ${index + 1} validation error:`, error.message);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }
});