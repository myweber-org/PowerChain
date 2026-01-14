function validateFileUpload(file, options = {}) {
  const {
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif'],
    maxSize = 5 * 1024 * 1024,
    minSize = 1024
  } = options;

  if (!file || !(file instanceof File)) {
    throw new Error('Invalid file object provided');
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type ${file.type} not allowed. Allowed types: ${allowedTypes.join(', ')}`
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `File size ${file.size} bytes exceeds maximum limit of ${maxSize} bytes`
    };
  }

  if (file.size < minSize) {
    return {
      isValid: false,
      error: `File size ${file.size} bytes is below minimum limit of ${minSize} bytes`
    };
  }

  return {
    isValid: true,
    file: file,
    details: {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified
    }
  };
}

function createFilePreview(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Only image files can be previewed'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = function(e) {
      resolve({
        url: e.target.result,
        width: 0,
        height: 0
      });
    };
    
    reader.onerror = function() {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
}

export { validateFileUpload, createFilePreview };