function trackUploadProgress(fileInputId, progressBarId) {
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

      setTimeout(simulateUpload, 300);
    };

    simulateUpload();
  });
}

function initializeUploadTracker() {
  trackUploadProgress('fileInput', 'uploadProgressBar');
}

document.addEventListener('DOMContentLoaded', initializeUploadTracker);