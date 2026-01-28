const FileUploader = (() => {
    const uploadQueue = new Map();
    let uploadEndpoint = '/api/upload';

    const setEndpoint = (endpoint) => {
        uploadEndpoint = endpoint;
    };

    const validateFile = (file, allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']) => {
        if (!allowedTypes.includes(file.type)) {
            throw new Error(`File type ${file.type} not allowed`);
        }
        if (file.size > 10 * 1024 * 1024) {
            throw new Error('File size exceeds 10MB limit');
        }
        return true;
    };

    const createProgressTracker = (fileId) => {
        const progressElement = document.createElement('div');
        progressElement.className = 'upload-progress';
        progressElement.innerHTML = `
            <div class="progress-bar"></div>
            <span class="progress-text">0%</span>
        `;

        const updateProgress = (percentage) => {
            const bar = progressElement.querySelector('.progress-bar');
            const text = progressElement.querySelector('.progress-text');
            bar.style.width = `${percentage}%`;
            text.textContent = `${Math.round(percentage)}%`;
        };

        return { element: progressElement, update: updateProgress };
    };

    const uploadFile = async (file) => {
        const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        try {
            validateFile(file);
            
            const formData = new FormData();
            formData.append('file', file);
            formData.append('timestamp', Date.now());

            const { element: progressElement, update: updateProgress } = createProgressTracker(fileId);
            document.body.appendChild(progressElement);

            const xhr = new XMLHttpRequest();
            
            uploadQueue.set(fileId, { xhr, file, progress: updateProgress });

            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    updateProgress(percentComplete);
                }
            });

            return new Promise((resolve, reject) => {
                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        uploadQueue.delete(fileId);
                        progressElement.remove();
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(new Error(`Upload failed: ${xhr.statusText}`));
                    }
                };

                xhr.onerror = () => {
                    uploadQueue.delete(fileId);
                    progressElement.remove();
                    reject(new Error('Network error during upload'));
                };

                xhr.open('POST', uploadEndpoint, true);
                xhr.send(formData);
            });
        } catch (error) {
            console.error(`Upload failed for ${file.name}:`, error);
            throw error;
        }
    };

    const cancelUpload = (fileId) => {
        const upload = uploadQueue.get(fileId);
        if (upload) {
            upload.xhr.abort();
            uploadQueue.delete(fileId);
            return true;
        }
        return false;
    };

    const setupDropZone = (elementId) => {
        const dropZone = document.getElementById(elementId);
        if (!dropZone) return;

        const preventDefaults = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.add('drag-active');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.remove('drag-active');
            }, false);
        });

        dropZone.addEventListener('drop', (e) => {
            const files = Array.from(e.dataTransfer.files);
            files.forEach(file => uploadFile(file).catch(console.error));
        }, false);
    };

    return {
        setEndpoint,
        uploadFile,
        cancelUpload,
        setupDropZone,
        getQueueSize: () => uploadQueue.size
    };
})();