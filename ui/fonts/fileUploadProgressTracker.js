function trackUploadProgress(fileInputId, progressBarId, statusId) {
    const fileInput = document.getElementById(fileInputId);
    const progressBar = document.getElementById(progressBarId);
    const statusDisplay = document.getElementById(statusId);

    if (!fileInput || !progressBar || !statusDisplay) {
        console.error('Required elements not found');
        return;
    }

    fileInput.addEventListener('change', function(event) {
        const files = event.target.files;
        if (files.length === 0) {
            statusDisplay.textContent = 'No file selected';
            return;
        }

        const file = files[0];
        statusDisplay.textContent = `Uploading: ${file.name}`;
        progressBar.value = 0;
        progressBar.max = 100;

        simulateUpload(file, progressBar, statusDisplay);
    });

    function simulateUpload(file, progressBar, statusDisplay) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                statusDisplay.textContent = `Upload complete: ${file.name}`;
                progressBar.classList.add('complete');
            }
            progressBar.value = progress;
        }, 300);
    }

    progressBar.addEventListener('click', function() {
        if (progressBar.value < 100) {
            statusDisplay.textContent = 'Upload cancelled';
            progressBar.value = 0;
            fileInput.value = '';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    trackUploadProgress('fileInput', 'uploadProgress', 'uploadStatus');
});function trackUploadProgress(fileInputId, progressBarId) {
    const fileInput = document.getElementById(fileInputId);
    const progressBar = document.getElementById(progressBarId);

    if (!fileInput || !progressBar) {
        console.error('Required elements not found');
        return;
    }

    fileInput.addEventListener('change', function(event) {
        const files = event.target.files;
        if (files.length === 0) return;

        const file = files[0];
        const chunkSize = 1024 * 1024; // 1MB chunks
        const totalChunks = Math.ceil(file.size / chunkSize);
        let uploadedChunks = 0;

        const simulateUpload = () => {
            if (uploadedChunks >= totalChunks) {
                progressBar.style.width = '100%';
                progressBar.textContent = '100%';
                console.log('Upload complete');
                return;
            }

            uploadedChunks++;
            const progress = Math.round((uploadedChunks / totalChunks) * 100);
            
            progressBar.style.width = `${progress}%`;
            progressBar.textContent = `${progress}%`;
            
            // Simulate network delay
            setTimeout(simulateUpload, Math.random() * 300 + 200);
        };

        progressBar.style.width = '0%';
        progressBar.textContent = '0%';
        simulateUpload();
    });
}

function initializeUploadTracker() {
    trackUploadProgress('fileInput', 'uploadProgressBar');
}

document.addEventListener('DOMContentLoaded', initializeUploadTracker);