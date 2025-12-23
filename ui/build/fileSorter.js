
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
    const grouped = {};
    
    files.forEach(file => {
        const ext = file.name.split('.').pop().toLowerCase();
        if (!grouped[ext]) {
            grouped[ext] = [];
        }
        grouped[ext].push(file);
    });
    
    return grouped;
}

export { sortFiles, groupFilesByExtension };