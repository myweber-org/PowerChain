function createProgressTracker(file, chunkSize = 1024 * 1024) {
    const totalChunks = Math.ceil(file.size / chunkSize);
    let uploadedChunks = 0;
    const startTime = Date.now();

    return {
        updateProgress: function(uploadedBytes) {
            uploadedChunks = Math.ceil(uploadedBytes / chunkSize);
            const progress = (uploadedChunks / totalChunks) * 100;
            const elapsedTime = (Date.now() - startTime) / 1000;
            const speed = uploadedBytes / elapsedTime;
            const remainingTime = (file.size - uploadedBytes) / speed;

            return {
                percentage: Math.min(progress, 100),
                uploaded: uploadedBytes,
                total: file.size,
                speed: speed,
                remainingTime: remainingTime,
                chunks: {
                    uploaded: uploadedChunks,
                    total: totalChunks
                }
            };
        },

        getChunk: function(chunkIndex) {
            const start = chunkIndex * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            return file.slice(start, end);
        },

        validateUpload: function(uploadedFile) {
            return uploadedFile.size === file.size && 
                   uploadedFile.name === file.name && 
                   uploadedFile.lastModified === file.lastModified;
        }
    };
}

function uploadFileWithProgress(file, uploadUrl) {
    const tracker = createProgressTracker(file);
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    
    formData.append('file', file);
    formData.append('totalChunks', tracker.totalChunks);

    xhr.upload.addEventListener('progress', function(event) {
        if (event.lengthComputable) {
            const progress = tracker.updateProgress(event.loaded);
            dispatchProgressEvent(progress);
        }
    });

    xhr.addEventListener('load', function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (tracker.validateUpload(response.file)) {
                dispatchUploadComplete(response);
            }
        }
    });

    xhr.addEventListener('error', function() {
        dispatchUploadError('Upload failed');
    });

    xhr.open('POST', uploadUrl, true);
    xhr.send(formData);
}

function dispatchProgressEvent(progress) {
    const event = new CustomEvent('upload-progress', { detail: progress });
    document.dispatchEvent(event);
}

function dispatchUploadComplete(response) {
    const event = new CustomEvent('upload-complete', { detail: response });
    document.dispatchEvent(event);
}

function dispatchUploadError(error) {
    const event = new CustomEvent('upload-error', { detail: error });
    document.dispatchEvent(event);
}const fileUploadProgressTracker = (fileInputId, progressBarId, statusTextId) => {
    const fileInput = document.getElementById(fileInputId);
    const progressBar = document.getElementById(progressBarId);
    const statusText = document.getElementById(statusTextId);

    if (!fileInput || !progressBar || !statusText) {
        console.error('Required elements not found');
        return;
    }

    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;
        if (files.length === 0) return;

        const file = files[0];
        const totalSize = file.size;
        let uploadedSize = 0;
        const chunkSize = 1024 * 1024; // 1MB chunks
        let currentChunk = 0;
        const totalChunks = Math.ceil(totalSize / chunkSize);

        const simulateUpload = () => {
            if (currentChunk >= totalChunks) {
                statusText.textContent = 'Upload complete';
                progressBar.style.width = '100%';
                return;
            }

            const chunkStart = currentChunk * chunkSize;
            const chunkEnd = Math.min(chunkStart + chunkSize, totalSize);
            const chunk = file.slice(chunkStart, chunkEnd);

            // Simulate network delay
            setTimeout(() => {
                uploadedSize += chunk.size;
                const percentage = Math.round((uploadedSize / totalSize) * 100);
                progressBar.style.width = `${percentage}%`;
                statusText.textContent = `Uploading: ${percentage}% (${uploadedSize} / ${totalSize} bytes)`;

                currentChunk++;
                simulateUpload();
            }, Math.random() * 300 + 200); // Random delay between 200-500ms
        };

        statusText.textContent = 'Starting upload...';
        simulateUpload();
    });
};

// Example usage when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    fileUploadProgressTracker('fileInput', 'progressBar', 'uploadStatus');
});