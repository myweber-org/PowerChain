function createProgressTracker(file, onProgress) {
    let startTime = Date.now();
    let lastLoaded = 0;
    let lastTime = startTime;

    return function(event) {
        if (event.lengthComputable) {
            const currentTime = Date.now();
            const loaded = event.loaded;
            const total = event.total;
            const percentage = Math.round((loaded / total) * 100);

            const timeDiff = (currentTime - lastTime) / 1000;
            const loadedDiff = loaded - lastLoaded;
            const speed = timeDiff > 0 ? (loadedDiff / timeDiff) : 0;

            const elapsed = (currentTime - startTime) / 1000;
            const averageSpeed = elapsed > 0 ? (loaded / elapsed) : 0;

            const remaining = total - loaded;
            const eta = averageSpeed > 0 ? (remaining / averageSpeed) : 0;

            onProgress({
                percentage: percentage,
                loaded: loaded,
                total: total,
                speed: speed,
                averageSpeed: averageSpeed,
                eta: eta,
                formattedSpeed: formatBytes(speed) + '/s',
                formattedAverageSpeed: formatBytes(averageSpeed) + '/s',
                formattedETA: formatTime(eta)
            });

            lastLoaded = loaded;
            lastTime = currentTime;
        }
    };
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatTime(seconds) {
    if (seconds === Infinity || seconds === 0) return '--';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
}

function uploadFile(file, url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('file', file);

        const progressTracker = createProgressTracker(file, (progress) => {
            console.log(`Upload: ${progress.percentage}%`);
            console.log(`Speed: ${progress.formattedSpeed}`);
            console.log(`Average: ${progress.formattedAverageSpeed}`);
            console.log(`ETA: ${progress.formattedETA}`);
        });

        xhr.upload.addEventListener('progress', progressTracker);
        xhr.addEventListener('load', () => resolve(xhr.response));
        xhr.addEventListener('error', () => reject(new Error('Upload failed')));
        xhr.addEventListener('abort', () => reject(new Error('Upload aborted')));

        xhr.open('POST', url);
        xhr.send(formData);
    });
}