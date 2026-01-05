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

export default FileUploadHandler;function validateFile(file, maxSize) {
    if (!file) {
        throw new Error('No file provided');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.');
    }

    if (file.size > maxSize) {
        throw new Error(`File size exceeds the limit of ${maxSize} bytes.`);
    }

    return {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
    };
}

function handleFileUpload(event, maxSize = 5 * 1024 * 1024) {
    try {
        const file = event.target.files[0];
        const validatedFile = validateFile(file, maxSize);
        
        console.log('File validated successfully:', validatedFile);
        return validatedFile;
    } catch (error) {
        console.error('File validation failed:', error.message);
        event.target.value = '';
        throw error;
    }
}

function createUploadForm() {
    const form = document.createElement('form');
    form.id = 'uploadForm';
    
    const input = document.createElement('input');
    input.type = 'file';
    input.id = 'fileInput';
    input.accept = '.jpg,.jpeg,.png,.pdf';
    
    const submitBtn = document.createElement('button');
    submitBtn.type = 'button';
    submitBtn.textContent = 'Upload File';
    
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        try {
            const file = handleFileUpload({ target: { files: input.files } });
            alert(`File "${file.name}" is ready for upload.`);
        } catch (error) {
            alert(error.message);
        }
    });
    
    form.appendChild(input);
    form.appendChild(submitBtn);
    
    return form;
}

export { validateFile, handleFileUpload, createUploadForm };function validateFile(file, maxSize) {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.');
    }
    
    if (file.size > maxSize) {
        throw new Error(`File size exceeds limit of ${maxSize / 1024 / 1024}MB`);
    }
    
    return {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
    };
}

function createUploadForm() {
    const form = document.createElement('form');
    form.id = 'uploadForm';
    form.enctype = 'multipart/form-data';
    
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.name = 'fileUpload';
    fileInput.multiple = true;
    fileInput.accept = '.jpg,.jpeg,.png,.pdf';
    
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Upload Files';
    
    form.appendChild(fileInput);
    form.appendChild(submitButton);
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const files = fileInput.files;
        const MAX_SIZE = 5 * 1024 * 1024;
        
        try {
            for (let file of files) {
                const validatedFile = validateFile(file, MAX_SIZE);
                console.log('Validated file:', validatedFile);
                await uploadFile(file);
            }
            alert('All files uploaded successfully!');
        } catch (error) {
            console.error('Upload failed:', error);
            alert(`Upload failed: ${error.message}`);
        }
    });
    
    return form;
}

async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
    });
    
    if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
    }
    
    return response.json();
}

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('uploadContainer');
    if (container) {
        container.appendChild(createUploadForm());
    }
});