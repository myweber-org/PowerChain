function FileUploader(config) {
    this.config = Object.assign({
        endpoint: '/upload',
        maxSize: 10485760,
        allowedTypes: ['image/jpeg', 'image/png', 'application/pdf']
    }, config);

    this.initialize = function() {
        this.setupDropZone();
        this.setupFileInput();
    };

    this.setupDropZone = function() {
        const dropZone = document.getElementById(this.config.dropZoneId);
        if (!dropZone) return;

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            this.handleFiles(e.dataTransfer.files);
        });
    };

    this.setupFileInput = function() {
        const fileInput = document.getElementById(this.config.fileInputId);
        if (!fileInput) return;

        fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });
    };

    this.handleFiles = function(files) {
        Array.from(files).forEach(file => {
            if (this.validateFile(file)) {
                this.uploadFile(file);
            }
        });
    };

    this.validateFile = function(file) {
        if (file.size > this.config.maxSize) {
            this.showError(`File ${file.name} exceeds maximum size`);
            return false;
        }

        if (!this.config.allowedTypes.includes(file.type)) {
            this.showError(`File type ${file.type} not allowed`);
            return false;
        }

        return true;
    };

    this.uploadFile = function(file) {
        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        const progressId = this.createProgressElement(file.name);

        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                this.updateProgress(progressId, percent);
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.updateProgress(progressId, 100, true);
                this.config.onSuccess && this.config.onSuccess(JSON.parse(xhr.responseText));
            } else {
                this.showError(`Upload failed: ${xhr.statusText}`);
                this.removeProgressElement(progressId);
            }
        });

        xhr.addEventListener('error', () => {
            this.showError('Network error during upload');
            this.removeProgressElement(progressId);
        });

        xhr.open('POST', this.config.endpoint);
        xhr.send(formData);
    };

    this.createProgressElement = function(filename) {
        const container = document.getElementById(this.config.progressContainerId);
        if (!container) return null;

        const progressId = `progress-${Date.now()}`;
        const progressHTML = `
            <div id="${progressId}" class="upload-progress">
                <div class="filename">${filename}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
                <div class="percentage">0%</div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', progressHTML);
        return progressId;
    };

    this.updateProgress = function(progressId, percent, complete = false) {
        const element = document.getElementById(progressId);
        if (!element) return;

        const fill = element.querySelector('.progress-fill');
        const percentage = element.querySelector('.percentage');

        fill.style.width = `${percent}%`;
        percentage.textContent = `${percent}%`;

        if (complete) {
            element.classList.add('complete');
            setTimeout(() => this.removeProgressElement(progressId), 2000);
        }
    };

    this.removeProgressElement = function(progressId) {
        const element = document.getElementById(progressId);
        if (element) {
            element.remove();
        }
    };

    this.showError = function(message) {
        console.error('Upload error:', message);
        this.config.onError && this.config.onError(message);
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FileUploader;
}