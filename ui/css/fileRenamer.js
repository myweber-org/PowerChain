function renameFilesWithSequentialNumbering(fileList, baseName) {
    if (!Array.isArray(fileList) || fileList.length === 0) {
        console.error('Invalid file list provided');
        return [];
    }

    const renamedFiles = [];
    const paddingLength = fileList.length.toString().length;

    fileList.forEach((file, index) => {
        const sequenceNumber = (index + 1).toString().padStart(paddingLength, '0');
        const extension = file.split('.').pop();
        const newFileName = `${baseName}_${sequenceNumber}.${extension}`;
        
        renamedFiles.push({
            original: file,
            renamed: newFileName
        });
    });

    return renamedFiles;
}