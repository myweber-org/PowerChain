const FileUploader = (function() {
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

    class Uploader {
        constructor(containerId, options = {}) {
            this.container = document.getElementById(containerId);
            this.options = {
                maxSize: options.maxSize || MAX_FILE_SIZE,
                allowedTypes: options.allowedTypes || ALLOWED_TYPES,
                endpoint: options.endpoint || '/upload',
                multiple: options.multiple || false
            };
            this.files = new Map();
            this.init();
        }

        init() {
            this.createUI();
            this.bindEvents();
        }

        createUI() {
            this.container.innerHTML = `
                <div class="upload-area">
                    <div class="drop-zone">
                        <p>Drag & drop files here or</p>
                        <button class="browse-btn">Browse Files</button>
                        <input type="file" class="file-input" ${this.options.multiple ? 'multiple' : ''}>
                    </div>
                    <div class="progress-container"></div>
                    <div class="file-list"></div>
                </div>
            `;
        }

        bindEvents() {
            const dropZone = this.container.querySelector('.drop-zone');
            const fileInput = this.container.querySelector('.file-input');
            const browseBtn = this.container.querySelector('.browse-btn');

            dropZone.addEventListener('dragover', this.handleDragOver.bind(this));
            dropZone.addEventListener('dragleave', this.handleDragLeave.bind(this));
            dropZone.addEventListener('drop', this.handleDrop.bind(this));
            browseBtn.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        }

        handleDragOver(e) {
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.classList.add('dragover');
        }

        handleDragLeave(e) {
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.classList.remove('dragover');
        }

        handleDrop(e) {
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.classList.remove('dragover');
            
            const files = Array.from(e.dataTransfer.files);
            this.processFiles(files);
        }

        handleFileSelect(e) {
            const files = Array.from(e.target.files);
            this.processFiles(files);
            e.target.value = '';
        }

        processFiles(files) {
            files.forEach(file => {
                if (!this.validateFile(file)) {
                    this.showError(`File ${file.name} is invalid`);
                    return;
                }
                
                const fileId = this.generateFileId();
                this.files.set(fileId, file);
                this.displayFile(file, fileId);
                this.uploadFile(file, fileId);
            });
        }

        validateFile(file) {
            if (file.size > this.options.maxSize) {
                return false;
            }
            
            if (!this.options.allowedTypes.includes(file.type)) {
                return false;
            }
            
            return true;
        }

        generateFileId() {
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        }

        displayFile(file, fileId) {
            const fileList = this.container.querySelector('.file-list');
            const fileElement = document.createElement('div');
            fileElement.className = 'file-item';
            fileElement.dataset.id = fileId;
            fileElement.innerHTML = `
                <span class="file-name">${file.name}</span>
                <span class="file-size">${this.formatFileSize(file.size)}</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
                <span class="status">Pending</span>
            `;
            fileList.appendChild(fileElement);
        }

        uploadFile(file, fileId) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileId', fileId);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', this.options.endpoint, true);

            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const percent = (e.loaded / e.total) * 100;
                    this.updateProgress(fileId, percent);
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    this.updateStatus(fileId, 'Completed');
                } else {
                    this.updateStatus(fileId, 'Failed');
                }
            });

            xhr.addEventListener('error', () => {
                this.updateStatus(fileId, 'Failed');
            });

            xhr.send(formData);
            this.updateStatus(fileId, 'Uploading');
        }

        updateProgress(fileId, percent) {
            const fileElement = this.container.querySelector(`[data-id="${fileId}"]`);
            if (fileElement) {
                const progressFill = fileElement.querySelector('.progress-fill');
                progressFill.style.width = `${percent}%`;
            }
        }

        updateStatus(fileId, status) {
            const fileElement = this.container.querySelector(`[data-id="${fileId}"]`);
            if (fileElement) {
                const statusElement = fileElement.querySelector('.status');
                statusElement.textContent = status;
                statusElement.className = `status ${status.toLowerCase()}`;
            }
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
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            this.container.appendChild(errorDiv);
            
            setTimeout(() => {
                errorDiv.remove();
            }, 5000);
        }

        clearFiles() {
            this.files.clear();
            this.container.querySelector('.file-list').innerHTML = '';
        }
    }

    return Uploader;
})();