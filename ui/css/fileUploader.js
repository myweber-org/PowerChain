const fileUploader = (() => {
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

  const validateFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size exceeds 10MB limit');
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error('File type not supported');
    }
    return true;
  };

  const createProgressTracker = (file) => {
    const progressElement = document.createElement('div');
    progressElement.className = 'upload-progress';
    progressElement.innerHTML = `
      <span>${file.name}</span>
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
      <span class="progress-text">0%</span>
    `;

    const updateProgress = (percentage) => {
      const fill = progressElement.querySelector('.progress-fill');
      const text = progressElement.querySelector('.progress-text');
      fill.style.width = `${percentage}%`;
      text.textContent = `${Math.round(percentage)}%`;
    };

    return { element: progressElement, update: updateProgress };
  };

  const uploadFile = async (file, uploadUrl) => {
    validateFile(file);
    
    const formData = new FormData();
    formData.append('file', file);
    
    const { element: progressElement, update: updateProgress } = createProgressTracker(file);
    document.body.appendChild(progressElement);

    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      updateProgress(100);
      return await response.json();
    } catch (error) {
      progressElement.classList.add('error');
      progressElement.querySelector('.progress-text').textContent = 'Failed';
      throw error;
    }
  };

  const handleFileSelect = (event, uploadUrl) => {
    const files = Array.from(event.target.files);
    const uploadPromises = files.map(file => uploadFile(file, uploadUrl));
    return Promise.allSettled(uploadPromises);
  };

  const initialize = (inputId, uploadUrl) => {
    const fileInput = document.getElementById(inputId);
    if (!fileInput) {
      console.error(`File input with id "${inputId}" not found`);
      return;
    }

    fileInput.addEventListener('change', (event) => {
      handleFileSelect(event, uploadUrl)
        .then(results => {
          const successful = results.filter(r => r.status === 'fulfilled');
          const failed = results.filter(r => r.status === 'rejected');
          console.log(`Upload complete: ${successful.length} succeeded, ${failed.length} failed`);
        });
    });

    fileInput.setAttribute('multiple', '');
    fileInput.setAttribute('accept', ALLOWED_TYPES.join(','));
  };

  return { initialize, uploadFile };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = fileUploader;
}