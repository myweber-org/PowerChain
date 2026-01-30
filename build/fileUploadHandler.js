function validateFile(file, maxSize) {
    if (!file) {
        throw new Error('No file provided');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type');
    }

    if (file.size > maxSize) {
        throw new Error('File size exceeds limit');
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
    fileInput.accept = '.jpg,.jpeg,.png,.pdf';

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Upload File';

    form.appendChild(fileInput);
    form.appendChild(submitButton);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const file = fileInput.files[0];
        try {
            const validatedFile = validateFile(file, 5 * 1024 * 1024);
            console.log('File validated:', validatedFile);
            // Proceed with upload logic
        } catch (error) {
            console.error('Validation error:', error.message);
            alert(error.message);
        }
    });

    return form;
}

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('uploadContainer');
    if (container) {
        container.appendChild(createUploadForm());
    }
});