function validateFile(file, maxSize) {
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

function handleFileUpload(event, maxSize = 5 * 1024 * 1024) {
    const file = event.target.files[0];
    
    if (!file) {
        console.error('No file selected');
        return null;
    }
    
    try {
        const validatedFile = validateFile(file, maxSize);
        console.log('File validated successfully:', validatedFile);
        return validatedFile;
    } catch (error) {
        console.error('File validation failed:', error.message);
        event.target.value = '';
        alert(error.message);
        return null;
    }
}

function createUploadPreview(file) {
    const preview = document.createElement('div');
    preview.className = 'file-preview';
    
    if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.alt = file.name;
        img.style.maxWidth = '200px';
        preview.appendChild(img);
    }
    
    const info = document.createElement('p');
    info.textContent = `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
    preview.appendChild(info);
    
    return preview;
}

document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    
    if (fileInput) {
        fileInput.addEventListener('change', function(event) {
            const file = handleFileUpload(event);
            
            if (file) {
                const preview = createUploadPreview(file);
                const container = document.getElementById('previewContainer');
                
                if (container) {
                    container.innerHTML = '';
                    container.appendChild(preview);
                }
            }
        });
    }
});