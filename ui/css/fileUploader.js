const fileUploader = (() => {
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

  const validateFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size exceeds 10MB limit');
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error('File type not supported');
    }
    return true;
  };

  const createProgressTracker = (file) => {
    const progressElement = document.createElement('div');
    progressElement.className = 'upload-progress';
    progressElement.innerHTML = `
      <span>${file.name}</span>
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
      <span class="progress-text">0%</span>
    `;

    const updateProgress = (percentage) => {
      const fill = progressElement.querySelector('.progress-fill');
      const text = progressElement.querySelector('.progress-text');
      fill.style.width = `${percentage}%`;
      text.textContent = `${Math.round(percentage)}%`;
    };

    return { element: progressElement, update: updateProgress };
  };

  const uploadFile = async (file, uploadUrl) => {
    validateFile(file);
    
    const formData = new FormData();
    formData.append('file', file);
    
    const { element: progressElement, update: updateProgress } = createProgressTracker(file);
    document.body.appendChild(progressElement);

    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      updateProgress(100);
      return await response.json();
    } catch (error) {
      progressElement.classList.add('error');
      progressElement.querySelector('.progress-text').textContent = 'Failed';
      throw error;
    }
  };

  const handleFileSelect = (event, uploadUrl) => {
    const files = Array.from(event.target.files);
    const uploadPromises = files.map(file => uploadFile(file, uploadUrl));
    return Promise.allSettled(uploadPromises);
  };

  const initialize = (inputId, uploadUrl) => {
    const fileInput = document.getElementById(inputId);
    if (!fileInput) {
      console.error(`File input with id "${inputId}" not found`);
      return;
    }

    fileInput.addEventListener('change', (event) => {
      handleFileSelect(event, uploadUrl)
        .then(results => {
          const successful = results.filter(r => r.status === 'fulfilled');
          const failed = results.filter(r => r.status === 'rejected');
          console.log(`Upload complete: ${successful.length} succeeded, ${failed.length} failed`);
        });
    });

    fileInput.setAttribute('multiple', '');
    fileInput.setAttribute('accept', ALLOWED_TYPES.join(','));
  };

  return { initialize, uploadFile };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = fileUploader;
}const FileUploader = (() => {
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
            this.dropzone.addEventListener('drop', this.handleDrop.bind(this));
            this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        }

        handleDragOver(e) {
            e.preventDefault();
            e.stopPropagation();
            this.dropzone.classList.add('dragover');
        }

        handleDrop(e) {
            e.preventDefault();
            e.stopPropagation();
            this.dropzone.classList.remove('dragover');
            
            const files = Array.from(e.dataTransfer.files);
            this.processFiles(files);
        }

        handleFileSelect(e) {
            const files = Array.from(e.target.files);
            this.processFiles(files);
            e.target.value = '';
        }

        processFiles(files) {
            const validFiles = files.filter(file => this.validateFile(file));
            
            if (validFiles.length === 0) {
                this.showError('No valid files selected');
                return;
            }

            validFiles.forEach(file => {
                this.files.push(file);
                this.uploadFile(file);
            });
        }

        validateFile(file) {
            if (file.size > MAX_FILE_SIZE) {
                this.showError(`File ${file.name} exceeds maximum size of 10MB`);
                return false;
            }

            if (!ALLOWED_TYPES.includes(file.type)) {
                this.showError(`File ${file.name} has unsupported type`);
                return false;
            }

            return true;
        }

        uploadFile(file) {
            const progressContainer = this.createProgressContainer(file);
            const progressBar = progressContainer.querySelector('.progress-bar');
            const progressText = progressContainer.querySelector('.progress-text');

            const formData = new FormData();
            formData.append('file', file);

            const xhr = new XMLHttpRequest();
            
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const percentComplete = Math.round((e.loaded / e.total) * 100);
                    progressBar.style.width = `${percentComplete}%`;
                    progressText.textContent = `${percentComplete}%`;
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    progressBar.classList.add('complete');
                    progressText.textContent = 'Upload complete';
                    this.onUploadComplete(file, JSON.parse(xhr.responseText));
                } else {
                    progressBar.classList.add('error');
                    progressText.textContent = 'Upload failed';
                    this.showError(`Upload failed for ${file.name}`);
                }
            });

            xhr.addEventListener('error', () => {
                progressBar.classList.add('error');
                progressText.textContent = 'Upload error';
                this.showError(`Network error for ${file.name}`);
            });

            xhr.open('POST', '/api/upload');
            xhr.send(formData);
        }

        createProgressContainer(file) {
            const container = document.createElement('div');
            container.className = 'upload-progress';
            container.innerHTML = `
                <div class="file-info">
                    <span class="file-name">${file.name}</span>
                    <span class="file-size">${this.formatFileSize(file.size)}</span>
                </div>
                <div class="progress-track">
                    <div class="progress-bar"></div>
                </div>
                <div class="progress-text">0%</div>
            `;
            this.container.appendChild(container);
            return container;
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
            this.container.appendChild(errorDiv);
            
            setTimeout(() => {
                errorDiv.remove();
            }, 5000);
        }

        onUploadComplete(file, response) {
            console.log(`File ${file.name} uploaded successfully:`, response);
        }

        clearFiles() {
            this.files = [];
            const progressElements = this.container.querySelectorAll('.upload-progress');
            progressElements.forEach(el => el.remove());
        }
    }

    return Uploader;
})();function validateFile(file, allowedTypes, maxSize) {
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type');
    }
    if (file.size > maxSize) {
        throw new Error('File size exceeds limit');
    }
    return true;
}

function uploadFile(file, url, onProgress) {
    return new Promise((resolve, reject) => {
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
                resolve(xhr.responseText);
            } else {
                reject(new Error(`Upload failed with status: ${xhr.status}`));
            }
        });

        xhr.addEventListener('error', () => {
            reject(new Error('Network error during upload'));
        });

        xhr.open('POST', url, true);
        xhr.send(formData);
    });
}

function handleFileSelect(event, options) {
    const files = Array.from(event.target.files);
    const uploadPromises = files.map(file => {
        try {
            validateFile(file, options.allowedTypes, options.maxSize);
            return uploadFile(file, options.uploadUrl, options.onProgress);
        } catch (error) {
            return Promise.reject(error);
        }
    });

    return Promise.allSettled(uploadPromises);
}