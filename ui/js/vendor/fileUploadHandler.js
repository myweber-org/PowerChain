function validateFile(file, maxSize) {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.');
    }
    
    if (file.size > maxSize) {
        throw new Error(`File size exceeds the limit of ${maxSize / 1024 / 1024}MB.`);
    }
    
    return {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
    };
}

function handleFileUpload(event, maxSize = 5 * 1024 * 1024) {
    const files = Array.from(event.target.files);
    const validFiles = [];
    const errors = [];
    
    files.forEach(file => {
        try {
            const validatedFile = validateFile(file, maxSize);
            validFiles.push(validatedFile);
        } catch (error) {
            errors.push({
                fileName: file.name,
                error: error.message
            });
        }
    });
    
    return {
        validFiles,
        errors,
        totalProcessed: files.length
    };
}

function createFilePreview(file) {
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
        reader.onload = function(e) {
            resolve({
                name: file.name,
                url: e.target.result,
                size: file.size
            });
        };
        
        reader.onerror = function() {
            reject(new Error('Failed to read file'));
        };
        
        if (file.type.startsWith('image/')) {
            reader.readAsDataURL(file);
        } else {
            resolve({
                name: file.name,
                url: null,
                size: file.size
            });
        }
    });
}

export { validateFile, handleFileUpload, createFilePreview };function uploadFile(file, onProgress, onComplete) {
  const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  const maxSize = 10 * 1024 * 1024;

  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.');
  }

  if (file.size > maxSize) {
    throw new Error('File size exceeds 10MB limit.');
  }

  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  formData.append('file', file);

  xhr.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable) {
      const percentComplete = (event.loaded / event.total) * 100;
      onProgress(percentComplete);
    }
  });

  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      onComplete(null, JSON.parse(xhr.responseText));
    } else {
      onComplete(new Error(`Upload failed with status: ${xhr.status}`), null);
    }
  });

  xhr.addEventListener('error', () => {
    onComplete(new Error('Network error during upload'), null);
  });

  xhr.open('POST', '/api/upload', true);
  xhr.send(formData);
}