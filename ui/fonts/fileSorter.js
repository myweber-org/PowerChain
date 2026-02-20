
function sortFiles(files) {
    return files.sort((a, b) => {
        const extA = a.name.split('.').pop().toLowerCase();
        const extB = b.name.split('.').pop().toLowerCase();
        
        if (extA !== extB) {
            return extA.localeCompare(extB);
        }
        
        return a.size - b.size;
    });
}

function groupFilesByExtension(files) {
    const groups = {};
    
    files.forEach(file => {
        const ext = file.name.split('.').pop().toLowerCase();
        if (!groups[ext]) {
            groups[ext] = [];
        }
        groups[ext].push(file);
    });
    
    return groups;
}

function getTotalSize(files) {
    return files.reduce((total, file) => total + file.size, 0);
}

function filterLargeFiles(files, maxSize) {
    return files.filter(file => file.size <= maxSize);
}

export { sortFiles, groupFilesByExtension, getTotalSize, filterLargeFiles };