function addTimestampPrefix(filename) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    return `${timestamp}_${filename}`;
}

function renameFile(originalName, callback) {
    if (typeof originalName !== 'string' || originalName.trim() === '') {
        callback(new Error('Invalid filename provided'));
        return;
    }
    
    const newName = addTimestampPrefix(originalName);
    callback(null, newName);
}

module.exports = { addTimestampPrefix, renameFile };