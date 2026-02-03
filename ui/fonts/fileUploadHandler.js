function validateFile(file, maxSize, allowedTypes) {
    if (!file) return { valid: false, error: 'No file provided' };
    
    if (file.size > maxSize) {
        return { 
            valid: false, 
            error: `File size exceeds limit of ${maxSize / 1024 / 1024}MB` 
        };
    }
    
    const fileType = file.type;
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileType) && !allowedTypes.includes(`.${fileExtension}`)) {
        return { 
            valid: false, 
            error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}` 
        };
    }
    
    return { valid: true, error: null };
}

function handleFileUpload(event, config) {
    const file = event.target.files[0];
    const validation = validateFile(file, config.maxSize, config.allowedTypes);
    
    if (!validation.valid) {
        console.error('Upload failed:', validation.error);
        return null;
    }
    
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
        reader.onload = function(e) {
            resolve({
                name: file.name,
                type: file.type,
                size: file.size,
                data: e.target.result,
                uploadedAt: new Date().toISOString()
            });
        };
        
        reader.onerror = function() {
            reject(new Error('Failed to read file'));
        };
        
        reader.readAsDataURL(file);
    });
}

const uploadConfig = {
    maxSize: 5 * 1024 * 1024,
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', '.pdf', '.txt']
};

document.getElementById('fileInput').addEventListener('change', async (event) => {
    try {
        const result = await handleFileUpload(event, uploadConfig);
        if (result) {
            console.log('File uploaded successfully:', result);
        }
    } catch (error) {
        console.error('Upload error:', error.message);
    }
});