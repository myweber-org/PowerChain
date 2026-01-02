const path = require('path');

function isValidPath(filePath) {
    if (typeof filePath !== 'string' || filePath.trim() === '') {
        return false;
    }
    const normalized = path.normalize(filePath);
    const pathComponents = normalized.split(path.sep);
    for (const component of pathComponents) {
        if (component === '..' || component === '.') {
            return false;
        }
    }
    return true;
}

function normalizeFilePath(filePath) {
    if (!isValidPath(filePath)) {
        throw new Error('Invalid file path provided');
    }
    return path.resolve(filePath);
}

function getFileExtension(filePath) {
    const normalized = normalizeFilePath(filePath);
    return path.extname(normalized).toLowerCase();
}

module.exports = {
    isValidPath,
    normalizeFilePath,
    getFileExtension
};