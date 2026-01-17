function validateFile(file) {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.');
  }

  if (file.size > maxSize) {
    throw new Error('File size exceeds 5MB limit.');
  }

  return true;
}

function uploadFile(file, onProgress) {
  return new Promise((resolve, reject) => {
    if (!validateFile(file)) {
      reject(new Error('File validation failed'));
      return;
    }

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
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(`Upload failed with status: ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error during upload'));
    });

    xhr.open('POST', '/api/upload');
    xhr.send(formData);
  });
}

function handleFileSelect(event) {
  const files = event.target.files;
  if (files.length === 0) return;

  const file = files[0];
  const progressBar = document.getElementById('uploadProgress');

  uploadFile(file, (progress) => {
    progressBar.value = progress;
    progressBar.textContent = `${Math.round(progress)}%`;
  })
    .then((response) => {
      console.log('Upload successful:', response);
      alert('File uploaded successfully!');
    })
    .catch((error) => {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error.message}`);
    });
}

document.getElementById('fileInput').addEventListener('change', handleFileSelect);function validateFile(file, allowedTypes, maxSize) {
    const errors = [];
    
    if (!allowedTypes.includes(file.type)) {
        errors.push(`File type ${file.type} not allowed`);
    }
    
    if (file.size > maxSize) {
        errors.push(`File size ${file.size} exceeds limit of ${maxSize}`);
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function trackUploadProgress(file, onProgress) {
    let uploaded = 0;
    const total = file.size;
    const chunkSize = 1024 * 1024;
    
    const uploadChunk = () => {
        if (uploaded >= total) {
            onProgress(100);
            return Promise.resolve();
        }
        
        const chunk = file.slice(uploaded, uploaded + chunkSize);
        uploaded += chunk.size;
        
        const progress = Math.round((uploaded / total) * 100);
        onProgress(progress);
        
        return simulateUpload(chunk).then(uploadChunk);
    };
    
    return uploadChunk();
}

function simulateUpload(chunk) {
    return new Promise(resolve => {
        setTimeout(resolve, Math.random() * 100 + 50);
    });
}

function createUploadHandler(config) {
    return async function handleUpload(files) {
        const results = [];
        
        for (const file of files) {
            const validation = validateFile(file, config.allowedTypes, config.maxSize);
            
            if (!validation.isValid) {
                results.push({
                    file: file.name,
                    success: false,
                    errors: validation.errors
                });
                continue;
            }
            
            try {
                await trackUploadProgress(file, (progress) => {
                    console.log(`Uploading ${file.name}: ${progress}%`);
                });
                
                results.push({
                    file: file.name,
                    success: true,
                    size: file.size,
                    type: file.type
                });
            } catch (error) {
                results.push({
                    file: file.name,
                    success: false,
                    errors: [error.message]
                });
            }
        }
        
        return results;
    };
}

export { createUploadHandler, validateFile };