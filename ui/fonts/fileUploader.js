class FileUploader {
    constructor(options = {}) {
        this.endpoint = options.endpoint || '/upload';
        this.maxSize = options.maxSize || 10485760; // 10MB
        this.allowedTypes = options.allowedTypes || ['image/jpeg', 'image/png', 'application/pdf'];
        this.uploadProgress = new Map();
    }

    validateFile(file) {
        if (file.size > this.maxSize) {
            throw new Error(`File size exceeds ${this.maxSize} bytes limit`);
        }

        if (!this.allowedTypes.includes(file.type)) {
            throw new Error(`File type ${file.type} not allowed`);
        }

        return true;
    }

    async uploadFile(file) {
        try {
            this.validateFile(file);
            
            const formData = new FormData();
            formData.append('file', file);
            
            const xhr = new XMLHttpRequest();
            
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const progress = Math.round((event.loaded / event.total) * 100);
                    this.uploadProgress.set(file.name, progress);
                    this.dispatchProgressEvent(file.name, progress);
                }
            });

            return new Promise((resolve, reject) => {
                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        this.uploadProgress.delete(file.name);
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(new Error(`Upload failed: ${xhr.statusText}`));
                    }
                };

                xhr.onerror = () => reject(new Error('Network error occurred'));
                
                xhr.open('POST', this.endpoint, true);
                xhr.send(formData);
            });
        } catch (error) {
            throw error;
        }
    }

    dispatchProgressEvent(filename, progress) {
        const event = new CustomEvent('upload-progress', {
            detail: { filename, progress }
        });
        document.dispatchEvent(event);
    }

    handleDropZone(element) {
        element.addEventListener('dragover', (e) => {
            e.preventDefault();
            element.classList.add('dragover');
        });

        element.addEventListener('dragleave', () => {
            element.classList.remove('dragover');
        });

        element.addEventListener('drop', (e) => {
            e.preventDefault();
            element.classList.remove('dragover');
            
            const files = Array.from(e.dataTransfer.files);
            files.forEach(file => this.uploadFile(file));
        });
    }
}

export default FileUploader;