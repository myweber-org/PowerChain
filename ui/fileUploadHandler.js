const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

class FileUploadHandler {
  constructor(uploadEndpoint) {
    this.uploadEndpoint = uploadEndpoint;
    this.progressCallbacks = [];
    this.completionCallbacks = [];
    this.errorCallbacks = [];
  }

  validateFile(file) {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error(`File type ${file.type} not allowed`);
    }

    return true;
  }

  upload(file) {
    return new Promise((resolve, reject) => {
      try {
        this.validateFile(file);
      } catch (error) {
        reject(error);
        return;
      }

      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append('file', file);

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          this.progressCallbacks.forEach(callback => callback(percentComplete));
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = JSON.parse(xhr.responseText);
          this.completionCallbacks.forEach(callback => callback(response));
          resolve(response);
        } else {
          const error = new Error(`Upload failed with status ${xhr.status}`);
          this.errorCallbacks.forEach(callback => callback(error));
          reject(error);
        }
      });

      xhr.addEventListener('error', () => {
        const error = new Error('Network error during upload');
        this.errorCallbacks.forEach(callback => callback(error));
        reject(error);
      });

      xhr.open('POST', this.uploadEndpoint);
      xhr.send(formData);
    });
  }

  onProgress(callback) {
    this.progressCallbacks.push(callback);
    return this;
  }

  onComplete(callback) {
    this.completionCallbacks.push(callback);
    return this;
  }

  onError(callback) {
    this.errorCallbacks.push(callback);
    return this;
  }
}

export default FileUploadHandler;