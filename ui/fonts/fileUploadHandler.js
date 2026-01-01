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

document.getElementById('fileInput').addEventListener('change', handleFileSelect);