function sortFiles(files) {
    return files.sort((a, b) => {
        const extA = a.name.split('.').pop().toLowerCase();
        const extB = b.name.split('.').pop().toLowerCase();
        if (extA < extB) return -1;
        if (extA > extB) return 1;
        return a.size - b.size;
    });
}