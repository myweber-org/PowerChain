function validateFileExtension(filename, allowedExtensions) {
    if (!filename || typeof filename !== 'string') {
        return false;
    }

    const extension = filename.toLowerCase().split('.').pop();
    const normalizedAllowed = allowedExtensions.map(ext => ext.toLowerCase().replace('.', ''));

    return normalizedAllowed.includes(extension);
}