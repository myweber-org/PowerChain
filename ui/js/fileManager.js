const fs = require('fs');
const path = require('path');

class FileManager {
  constructor(basePath) {
    this.basePath = basePath;
  }

  readFile(filePath) {
    const fullPath = path.join(this.basePath, filePath);
    try {
      return fs.readFileSync(fullPath, 'utf8');
    } catch (error) {
      throw new Error(`Failed to read file: ${error.message}`);
    }
  }

  writeFile(filePath, content) {
    const fullPath = path.join(this.basePath, filePath);
    const dir = path.dirname(fullPath);
    
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(fullPath, content, 'utf8');
      return true;
    } catch (error) {
      throw new Error(`Failed to write file: ${error.message}`);
    }
  }

  deleteFile(filePath) {
    const fullPath = path.join(this.basePath, filePath);
    try {
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  listFiles(directory = '') {
    const fullPath = path.join(this.basePath, directory);
    try {
      return fs.readdirSync(fullPath);
    } catch (error) {
      throw new Error(`Failed to list files: ${error.message}`);
    }
  }
}

module.exports = FileManager;class FileManager {
  constructor() {
    this.files = new Map();
  }

  createFile(filename, content = '') {
    if (this.files.has(filename)) {
      throw new Error(`File ${filename} already exists`);
    }
    this.files.set(filename, content);
    return { success: true, filename };
  }

  readFile(filename) {
    if (!this.files.has(filename)) {
      throw new Error(`File ${filename} not found`);
    }
    return this.files.get(filename);
  }

  deleteFile(filename) {
    if (!this.files.has(filename)) {
      throw new Error(`File ${filename} not found`);
    }
    this.files.delete(filename);
    return { success: true, filename };
  }

  listFiles() {
    return Array.from(this.files.keys());
  }

  getFileCount() {
    return this.files.size;
  }
}

const manager = new FileManager();

export default FileManager;