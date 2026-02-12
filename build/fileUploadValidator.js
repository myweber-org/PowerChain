function validateImageFile(file) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.');
  }

  if (file.size > maxSize) {
    throw new Error('File size exceeds 5MB limit.');
  }

  return true;
}

function validateMultipleFiles(files) {
  const maxFiles = 10;
  
  if (files.length > maxFiles) {
    throw new Error(`Maximum ${maxFiles} files allowed per upload.`);
  }

  return Array.from(files).every(file => validateImageFile(file));
}