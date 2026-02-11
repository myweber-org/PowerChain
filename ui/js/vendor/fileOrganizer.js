const fs = require('fs');
const path = require('path');

function organizeFiles(directoryPath) {
    const extensions = {
        images: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
        documents: ['pdf', 'doc', 'docx', 'txt', 'xlsx'],
        audio: ['mp3', 'wav', 'aac'],
        video: ['mp4', 'avi', 'mov', 'mkv']
    };

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directoryPath, file);
            
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

                if (stats.isFile()) {
                    const ext = path.extname(file).toLowerCase().slice(1);
                    let targetFolder = 'others';

                    for (const [folder, extList] of Object.entries(extensions)) {
                        if (extList.includes(ext)) {
                            targetFolder = folder;
                            break;
                        }
                    }

                    const targetPath = path.join(directoryPath, targetFolder);
                    
                    if (!fs.existsSync(targetPath)) {
                        fs.mkdirSync(targetPath);
                    }

                    const newFilePath = path.join(targetPath, file);
                    
                    fs.rename(filePath, newFilePath, (err) => {
                        if (err) {
                            console.error('Error moving file:', err);
                        } else {
                            console.log(`Moved ${file} to ${targetFolder}/`);
                        }
                    });
                }
            });
        });
    });
}

if (require.main === module) {
    const targetDirectory = process.argv[2] || '.';
    organizeFiles(targetDirectory);
}

module.exports = { organizeFiles };