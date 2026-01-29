const FileUploader = (function() {
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

    class Uploader {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            this.files = [];
            this.initialize();
        }

        initialize() {
            this.createDropZone();
            this.bindEvents();
        }

        createDropZone() {
            this.dropZone = document.createElement('div');
            this.dropZone.className = 'upload-dropzone';
            this.dropZone.innerHTML = `
                <div class="drop-area">
                    <p>Drag files here or click to browse</p>
                    <input type="file" multiple style="display:none">
                </div>
                <div class="progress-container"></div>
            `;
            this.container.appendChild(this.dropZone);
        }

        bindEvents() {
            const dropArea = this.dropZone.querySelector('.drop-area');
            const fileInput = this.dropZone.querySelector('input[type="file"]');

            dropArea.addEventListener('click', () => fileInput.click());
            dropArea.addEventListener('dragover', this.handleDragOver.bind(this));
            dropArea.addEventListener('drop', this.handleDrop.bind(this));
            fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        }

        handleDragOver(e) {
            e.preventDefault();
            e.stopPropagation();
            this.dropZone.classList.add('dragover');
        }

        handleDrop(e) {
            e.preventDefault();
            e.stopPropagation();
            this.dropZone.classList.remove('dragover');
            
            const files = Array.from(e.dataTransfer.files);
            this.processFiles(files);
        }

        handleFileSelect(e) {
            const files = Array.from(e.target.files);
            this.processFiles(files);
        }

        processFiles(files) {
            files.forEach(file => {
                if (!this.validateFile(file)) {
                    this.showError(`${file.name} is invalid`);
                    return;
                }
                
                this.files.push(file);
                this.uploadFile(file);
            });
        }

        validateFile(file) {
            if (file.size > MAX_FILE_SIZE) {
                return false;
            }
            
            if (!ALLOWED_TYPES.includes(file.type)) {
                return false;
            }
            
            return true;
        }

        uploadFile(file) {
            const progressBar = this.createProgressBar(file.name);
            
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            formData.append('file', file);

            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const percent = Math.round((e.loaded / e.total) * 100);
                    progressBar.update(percent);
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    progressBar.complete();
                    this.onUploadSuccess(file);
                } else {
                    progressBar.error();
                    this.onUploadError(file);
                }
            });

            xhr.addEventListener('error', () => {
                progressBar.error();
                this.onUploadError(file);
            });

            xhr.open('POST', '/upload');
            xhr.send(formData);
        }

        createProgressBar(filename) {
            const container = this.dropZone.querySelector('.progress-container');
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-item';
            progressBar.innerHTML = `
                <div class="file-info">${filename}</div>
                <div class="progress-track">
                    <div class="progress-fill"></div>
                </div>
                <div class="status"></div>
            `;
            container.appendChild(progressBar);

            return {
                update: (percent) => {
                    const fill = progressBar.querySelector('.progress-fill');
                    fill.style.width = `${percent}%`;
                    progressBar.querySelector('.status').textContent = `${percent}%`;
                },
                complete: () => {
                    progressBar.classList.add('complete');
                    progressBar.querySelector('.status').textContent = 'Complete';
                },
                error: () => {
                    progressBar.classList.add('error');
                    progressBar.querySelector('.status').textContent = 'Failed';
                }
            };
        }

        onUploadSuccess(file) {
            console.log(`Upload successful: ${file.name}`);
        }

        onUploadError(file) {
            console.error(`Upload failed: ${file.name}`);
        }

        showError(message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'upload-error';
            errorDiv.textContent = message;
            this.dropZone.appendChild(errorDiv);
            
            setTimeout(() => errorDiv.remove(), 5000);
        }

        getUploadedFiles() {
            return this.files;
        }

        clearFiles() {
            this.files = [];
            const container = this.dropZone.querySelector('.progress-container');
            container.innerHTML = '';
        }
    }

    return Uploader;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FileUploader;
}