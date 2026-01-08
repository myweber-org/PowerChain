function renameFileWithTimestamp(originalName, customPrefix = 'doc') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const extension = originalName.includes('.') ? originalName.split('.').pop() : '';
    const baseName = originalName.includes('.') ? originalName.slice(0, originalName.lastIndexOf('.')) : originalName;
    
    const newName = extension 
        ? `${customPrefix}_${baseName}_${timestamp}.${extension}`
        : `${customPrefix}_${baseName}_${timestamp}`;
    
    return {
        original: originalName,
        renamed: newName,
        timestamp: new Date().toISOString()
    };
}