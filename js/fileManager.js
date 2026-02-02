const fs = require('fs');
const path = require('path');

class FileManager {
    constructor(basePath) {
        this.basePath = basePath;
    }

    readJSON(filename) {
        const filePath = path.join(this.basePath, filename);
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log(`File ${filename} not found. Returning empty object.`);
                return {};
            }
            throw error;
        }
    }

    writeJSON(filename, data) {
        const filePath = path.join(this.basePath, filename);
        const dir = path.dirname(filePath);
        
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(filePath, jsonData, 'utf8');
        console.log(`Data written to ${filename} successfully.`);
    }

    mergeJSON(filename, newData) {
        const existingData = this.readJSON(filename);
        const mergedData = { ...existingData, ...newData };
        this.writeJSON(filename, mergedData);
        return mergedData;
    }
}

module.exports = FileManager;const fs = require('fs');
const path = require('path');

function readJsonFile(filePath) {
    try {
        const absolutePath = path.resolve(filePath);
        const fileContent = fs.readFileSync(absolutePath, 'utf8');
        const parsedData = JSON.parse(fileContent);
        return { success: true, data: parsedData };
    } catch (error) {
        let errorMessage = 'Unknown error occurred';
        if (error.code === 'ENOENT') {
            errorMessage = 'File not found';
        } else if (error instanceof SyntaxError) {
            errorMessage = 'Invalid JSON format';
        } else {
            errorMessage = error.message;
        }
        return { 
            success: false, 
            error: errorMessage,
            details: error 
        };
    }
}

module.exports = { readJsonFile };