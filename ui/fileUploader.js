const FileUploader = (function() {
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

    class Uploader {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            this.files = [];
            this.init();
        }

        init() {
            this.createDropZone();
            this.bindEvents();
        }

        createDropZone() {
            this.dropZone = document.createElement('div');
            this.dropZone.className = 'upload-dropzone';
            this.dropZone.innerHTML = `
                <div class="dropzone-content">
                    <svg class="upload-icon" width="48" height="48" viewBox="0 0 24 24">
                        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                    </svg>
                    <p class="dropzone-text">Drag & drop files here</p>
                    <p class="dropzone-subtext">or click to browse</p>
                    <input type="file" class="file-input" multiple style="display: none;">
                </div>
                <div class="progress-container" style="display: none;"></div>
            `;
            this.container.appendChild(this.dropZone);
        }

        bindEvents() {
            const dropZone = this.dropZone;
            const fileInput = dropZone.querySelector('.file-input');

            dropZone.addEventListener('click', () => fileInput.click());
            dropZone.addEventListener('dragover', this.handleDragOver.bind(this));
            dropZone.addEventListener('dragleave', this.handleDragLeave.bind(this));
            dropZone.addEventListener('drop', this.handleDrop.bind(this));
            fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        }

        handleDragOver(e) {
            e.preventDefault();
            this.dropZone.classList.add('dragover');
        }

        handleDragLeave() {
            this.dropZone.classList.remove('dragover');
        }

        handleDrop(e) {
            e.preventDefault();
            this.dropZone.classList.remove('dragover');
            const files = Array.from(e.dataTransfer.files);
            this.processFiles(files);
        }

        handleFileSelect(e) {
            const files = Array.from(e.target.files);
            this.processFiles(files);
        }

        processFiles(files) {
            const validFiles = files.filter(file => this.validateFile(file));
            
            if (validFiles.length === 0) {
                this.showError('No valid files selected');
                return;
            }

            this.files.push(...validFiles);
            this.uploadFiles(validFiles);
        }

        validateFile(file) {
            if (file.size > MAX_FILE_SIZE) {
                this.showError(`File ${file.name} exceeds maximum size`);
                return false;
            }

            if (!ALLOWED_TYPES.includes(file.type)) {
                this.showError(`File type not supported: ${file.name}`);
                return false;
            }

            return true;
        }

        uploadFiles(files) {
            files.forEach(file => {
                this.createProgressBar(file);
                this.simulateUpload(file);
            });
        }

        createProgressBar(file) {
            const progressContainer = this.dropZone.querySelector('.progress-container');
            progressContainer.style.display = 'block';

            const progressItem = document.createElement('div');
            progressItem.className = 'progress-item';
            progressItem.innerHTML = `
                <div class="file-info">
                    <span class="file-name">${file.name}</span>
                    <span class="file-size">${this.formatFileSize(file.size)}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
                <div class="progress-status">0%</div>
            `;

            progressContainer.appendChild(progressItem);
        }

        simulateUpload(file) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    this.updateProgress(file.name, progress, 'completed');
                } else {
                    this.updateProgress(file.name, progress, 'uploading');
                }
            }, 200);
        }

        updateProgress(fileName, progress, status) {
            const progressItems = this.dropZone.querySelectorAll('.progress-item');
            progressItems.forEach(item => {
                const nameElement = item.querySelector('.file-name');
                if (nameElement.textContent === fileName) {
                    const fillElement = item.querySelector('.progress-fill');
                    const statusElement = item.querySelector('.progress-status');
                    
                    fillElement.style.width = `${progress}%`;
                    statusElement.textContent = `${Math.round(progress)}%`;
                    
                    if (status === 'completed') {
                        item.classList.add('completed');
                        statusElement.textContent = '✓ Uploaded';
                    }
                }
            });
        }

        formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        showError(message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'upload-error';
            errorDiv.textContent = message;
            this.dropZone.appendChild(errorDiv);
            
            setTimeout(() => {
                errorDiv.remove();
            }, 3000);
        }

        getUploadedFiles() {
            return this.files.filter(file => 
                this.dropZone.querySelector(`.file-name:contains("${file.name}")`)?.closest('.progress-item')?.classList.contains('completed')
            );
        }

        reset() {
            this.files = [];
            const progressContainer = this.dropZone.querySelector('.progress-container');
            progressContainer.innerHTML = '';
            progressContainer.style.display = 'none';
        }
    }

    return Uploader;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FileUploader;
}