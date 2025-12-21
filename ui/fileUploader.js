const FileUploader = (() => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

    class Uploader {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            this.files = [];
            this.init();
        }

        init() {
            this.createDropzone();
            this.bindEvents();
        }

        createDropzone() {
            this.dropzone = document.createElement('div');
            this.dropzone.className = 'upload-dropzone';
            this.dropzone.innerHTML = `
                <div class="dropzone-content">
                    <svg class="upload-icon" width="48" height="48" viewBox="0 0 24 24">
                        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                    </svg>
                    <p class="dropzone-text">Drag & drop files here or click to browse</p>
                    <input type="file" class="file-input" multiple style="display: none;">
                </div>
            `;
            this.container.appendChild(this.dropzone);
            this.fileInput = this.dropzone.querySelector('.file-input');
        }

        bindEvents() {
            this.dropzone.addEventListener('click', () => this.fileInput.click());
            this.dropzone.addEventListener('dragover', this.handleDragOver.bind(this));
            this.dropzone.addEventListener('dragleave', this.handleDragLeave.bind(this));
            this.dropzone.addEventListener('drop', this.handleDrop.bind(this));
            this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        }

        handleDragOver(e) {
            e.preventDefault();
            this.dropzone.classList.add('dragover');
        }

        handleDragLeave(e) {
            e.preventDefault();
            this.dropzone.classList.remove('dragover');
        }

        handleDrop(e) {
            e.preventDefault();
            this.dropzone.classList.remove('dragover');
            const files = Array.from(e.dataTransfer.files);
            this.processFiles(files);
        }

        handleFileSelect(e) {
            const files = Array.from(e.target.files);
            this.processFiles(files);
        }

        processFiles(files) {
            const validFiles = files.filter(file => this.validateFile(file));
            
            if (validFiles.length !== files.length) {
                this.showError('Some files were rejected due to size or type restrictions');
            }

            this.files = [...this.files, ...validFiles];
            this.uploadFiles(validFiles);
        }

        validateFile(file) {
            if (file.size > MAX_FILE_SIZE) {
                console.warn(`File ${file.name} exceeds maximum size limit`);
                return false;
            }

            if (!ALLOWED_TYPES.includes(file.type)) {
                console.warn(`File ${file.name} has unsupported type: ${file.type}`);
                return false;
            }

            return true;
        }

        async uploadFiles(files) {
            for (const file of files) {
                try {
                    await this.uploadSingleFile(file);
                } catch (error) {
                    console.error(`Failed to upload ${file.name}:`, error);
                    this.showError(`Failed to upload ${file.name}`);
                }
            }
        }

        uploadSingleFile(file) {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('file', file);

                const xhr = new XMLHttpRequest();
                const progressBar = this.createProgressBar(file.name);

                xhr.upload.addEventListener('progress', (e) => {
                    if (e.lengthComputable) {
                        const percent = Math.round((e.loaded / e.total) * 100);
                        progressBar.update(percent);
                    }
                });

                xhr.addEventListener('load', () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        progressBar.complete();
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        progressBar.error();
                        reject(new Error(`Upload failed with status ${xhr.status}`));
                    }
                });

                xhr.addEventListener('error', () => {
                    progressBar.error();
                    reject(new Error('Network error occurred'));
                });

                xhr.open('POST', '/api/upload');
                xhr.send(formData);
            });
        }

        createProgressBar(filename) {
            const progressContainer = document.createElement('div');
            progressContainer.className = 'progress-container';
            progressContainer.innerHTML = `
                <div class="progress-info">
                    <span class="filename">${filename}</span>
                    <span class="progress-percent">0%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
            `;

            this.container.appendChild(progressContainer);

            return {
                update: (percent) => {
                    const fill = progressContainer.querySelector('.progress-fill');
                    const percentText = progressContainer.querySelector('.progress-percent');
                    fill.style.width = `${percent}%`;
                    percentText.textContent = `${percent}%`;
                },
                complete: () => {
                    progressContainer.classList.add('complete');
                    progressContainer.querySelector('.progress-percent').textContent = 'Complete';
                },
                error: () => {
                    progressContainer.classList.add('error');
                    progressContainer.querySelector('.progress-percent').textContent = 'Failed';
                }
            };
        }

        showError(message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'upload-error';
            errorDiv.textContent = message;
            this.container.appendChild(errorDiv);

            setTimeout(() => {
                errorDiv.remove();
            }, 5000);
        }

        getUploadedFiles() {
            return [...this.files];
        }

        clearFiles() {
            this.files = [];
            const progressContainers = this.container.querySelectorAll('.progress-container');
            progressContainers.forEach(container => container.remove());
        }
    }

    return Uploader;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FileUploader;
}