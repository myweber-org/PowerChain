const fs = require('fs');
const path = require('path');

class FileManager {
  constructor(basePath) {
    this.basePath = basePath || process.cwd();
  }

  readFile(filePath) {
    const fullPath = path.join(this.basePath, filePath);
    return new Promise((resolve, reject) => {
      fs.readFile(fullPath, 'utf8', (err, data) => {
        if (err) {
          reject(new Error(`Failed to read file: ${err.message}`));
        } else {
          resolve(data);
        }
      });
    });
  }

  writeFile(filePath, content) {
    const fullPath = path.join(this.basePath, filePath);
    return new Promise((resolve, reject) => {
      fs.writeFile(fullPath, content, 'utf8', (err) => {
        if (err) {
          reject(new Error(`Failed to write file: ${err.message}`));
        } else {
          resolve(true);
        }
      });
    });
  }

  listFiles(directoryPath) {
    const fullPath = path.join(this.basePath, directoryPath);
    return new Promise((resolve, reject) => {
      fs.readdir(fullPath, (err, files) => {
        if (err) {
          reject(new Error(`Failed to list files: ${err.message}`));
        } else {
          resolve(files);
        }
      });
    });
  }

  getFileStats(filePath) {
    const fullPath = path.join(this.basePath, filePath);
    return new Promise((resolve, reject) => {
      fs.stat(fullPath, (err, stats) => {
        if (err) {
          reject(new Error(`Failed to get file stats: ${err.message}`));
        } else {
          resolve({
            size: stats.size,
            isDirectory: stats.isDirectory(),
            modified: stats.mtime,
            created: stats.birthtime
          });
        }
      });
    });
  }

  static validatePath(filePath) {
    const invalidChars = /[<>:"|?*]/;
    return !invalidChars.test(filePath);
  }
}

module.exports = FileManager;