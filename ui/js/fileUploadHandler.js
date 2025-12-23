function uploadFile(file, url, onProgress, onSuccess, onError) {
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
        if (xhr.status >= 200 && xhr.status < 300) {
            if (typeof onSuccess === 'function') {
                onSuccess(xhr.responseText);
            }
        } else {
            if (typeof onError === 'function') {
                onError(new Error(`Upload failed with status: ${xhr.status}`));
            }
        }
    });

    xhr.addEventListener('error', () => {
        if (typeof onError === 'function') {
            onError(new Error('Network error during upload'));
        }
    });

    xhr.open('POST', url, true);
    xhr.send(formData);
}