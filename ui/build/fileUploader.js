function FileUploader(options) {
  this.url = options.url || '/upload';
  this.maxSize = options.maxSize || 10485760;
  this.allowedTypes = options.allowedTypes || ['image/jpeg', 'image/png', 'application/pdf'];
  this.onProgress = options.onProgress || function() {};
  this.onComplete = options.onComplete || function() {};
  this.onError = options.onError || function() {};
}

FileUploader.prototype.validateFile = function(file) {
  if (file.size > this.maxSize) {
    throw new Error('File size exceeds maximum limit');
  }
  
  if (!this.allowedTypes.includes(file.type)) {
    throw new Error('File type not allowed');
  }
  
  return true;
};

FileUploader.prototype.upload = function(file) {
  const self = this;
  
  try {
    self.validateFile(file);
  } catch (error) {
    self.onError(error.message);
    return Promise.reject(error);
  }
  
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    
    formData.append('file', file);
    
    xhr.upload.addEventListener('progress', function(event) {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        self.onProgress(percentComplete);
      }
    });
    
    xhr.addEventListener('load', function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        self.onComplete(response);
        resolve(response);
      } else {
        const error = new Error(`Upload failed with status: ${xhr.status}`);
        self.onError(error.message);
        reject(error);
      }
    });
    
    xhr.addEventListener('error', function() {
      const error = new Error('Network error occurred during upload');
      self.onError(error.message);
      reject(error);
    });
    
    xhr.open('POST', self.url, true);
    xhr.send(formData);
  });
};

FileUploader.prototype.uploadMultiple = function(files) {
  const uploadPromises = Array.from(files).map(file => this.upload(file));
  return Promise.all(uploadPromises);
};const fileUploader = (() => {
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

    const uploadFile = async (file, onProgress = null) => {
        try {
            validateFile(file);
            
            const formData = new FormData();
            formData.append('file', file);
            formData.append('timestamp', Date.now());

            const xhr = new XMLHttpRequest();
            const uploadId = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            
            uploadQueue.set(uploadId, { xhr, file, progress: 0 });

            return new Promise((resolve, reject) => {
                xhr.upload.addEventListener('progress', (event) => {
                    if (event.lengthComputable && onProgress) {
                        const progress = Math.round((event.loaded / event.total) * 100);
                        uploadQueue.get(uploadId).progress = progress;
                        onProgress(progress, uploadId);
                    }
                });

                xhr.addEventListener('load', () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        uploadQueue.delete(uploadId);
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(new Error(`Upload failed with status ${xhr.status}`));
                    }
                });

                xhr.addEventListener('error', () => {
                    uploadQueue.delete(uploadId);
                    reject(new Error('Network error during upload'));
                });

                xhr.open('POST', uploadEndpoint);
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xhr.send(formData);
            });
        } catch (error) {
            throw error;
        }
    };

    const cancelUpload = (uploadId) => {
        const upload = uploadQueue.get(uploadId);
        if (upload) {
            upload.xhr.abort();
            uploadQueue.delete(uploadId);
            return true;
        }
        return false;
    };

    const getUploadStatus = (uploadId) => {
        const upload = uploadQueue.get(uploadId);
        return upload ? { 
            name: upload.file.name, 
            size: upload.file.size, 
            progress: upload.progress 
        } : null;
    };

    const initializeDropZone = (elementId) => {
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
            files.forEach(file => {
                uploadFile(file).catch(console.error);
            });
        }, false);
    };

    return {
        setEndpoint,
        uploadFile,
        cancelUpload,
        getUploadStatus,
        initializeDropZone,
        get queueSize() {
            return uploadQueue.size;
        }
    };
})();

export default fileUploader;const fileUploader = (() => {
    const uploadQueue = new Map();
    let uploadInProgress = false;

    const validateFile = (file, allowedTypes, maxSize) => {
        if (!allowedTypes.includes(file.type)) {
            throw new Error(`File type ${file.type} not allowed`);
        }
        if (file.size > maxSize) {
            throw new Error(`File size ${file.size} exceeds limit ${maxSize}`);
        }
        return true;
    };

    const uploadFile = async (file, uploadUrl, onProgress) => {
        const formData = new FormData();
        formData.append('file', file);

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', uploadUrl, true);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable && onProgress) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    onProgress(percentComplete);
                }
            };

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error(`Upload failed: ${xhr.statusText}`));
                }
            };

            xhr.onerror = () => reject(new Error('Network error'));
            xhr.send(formData);
        });
    };

    const processQueue = async () => {
        if (uploadInProgress || uploadQueue.size === 0) return;

        uploadInProgress = true;
        const [id, { file, uploadUrl, onProgress, resolve, reject }] = uploadQueue.entries().next().value;

        try {
            const result = await uploadFile(file, uploadUrl, onProgress);
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            uploadQueue.delete(id);
            uploadInProgress = false;
            processQueue();
        }
    };

    return {
        addToQueue: (file, uploadUrl, allowedTypes, maxSize, onProgress) => {
            return new Promise((resolve, reject) => {
                try {
                    validateFile(file, allowedTypes, maxSize);
                    const id = Date.now() + Math.random();
                    uploadQueue.set(id, { file, uploadUrl, onProgress, resolve, reject });
                    processQueue();
                } catch (error) {
                    reject(error);
                }
            });
        },

        cancelUpload: (id) => {
            if (uploadQueue.has(id)) {
                uploadQueue.delete(id);
                return true;
            }
            return false;
        },

        getQueueSize: () => uploadQueue.size,

        clearQueue: () => {
            uploadQueue.clear();
            uploadInProgress = false;
        }
    };
})();

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
        files.forEach(file => {
            console.log('File dropped:', file.name);
        });
    }, false);
};

export { fileUploader, setupDropZone };