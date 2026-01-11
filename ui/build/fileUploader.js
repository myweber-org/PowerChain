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
};