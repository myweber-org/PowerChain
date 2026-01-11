class FileManager {
  constructor() {
    this.files = new Map();
  }

  createFile(filename, content = '') {
    if (this.files.has(filename)) {
      throw new Error(`File ${filename} already exists`);
    }
    this.files.set(filename, content);
    return { filename, content };
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
    return true;
  }

  listFiles() {
    return Array.from(this.files.keys());
  }

  searchFiles(pattern) {
    const regex = new RegExp(pattern);
    return this.listFiles().filter(filename => regex.test(filename));
  }
}

const manager = new FileManager();
manager.createFile('document.txt', 'Sample content');
manager.createFile('data.json', '{"key": "value"}');
console.log(manager.listFiles());const fs = require('fs').promises;
const path = require('path');

class FileManager {
  constructor(basePath = process.cwd()) {
    this.basePath = basePath;
  }

  async readJSON(filePath) {
    try {
      const fullPath = path.join(this.basePath, filePath);
      const data = await fs.readFile(fullPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`File not found: ${filePath}`);
      }
      if (error instanceof SyntaxError) {
        throw new Error(`Invalid JSON format in file: ${filePath}`);
      }
      throw error;
    }
  }

  async writeJSON(filePath, data) {
    try {
      const fullPath = path.join(this.basePath, filePath);
      const jsonString = JSON.stringify(data, null, 2);
      await fs.writeFile(fullPath, jsonString, 'utf8');
      return true;
    } catch (error) {
      if (error.code === 'EACCES') {
        throw new Error(`Permission denied when writing to: ${filePath}`);
      }
      throw error;
    }
  }

  async mergeJSON(filePath, newData) {
    try {
      const existingData = await this.readJSON(filePath);
      const mergedData = { ...existingData, ...newData };
      await this.writeJSON(filePath, mergedData);
      return mergedData;
    } catch (error) {
      if (error.message.includes('File not found')) {
        await this.writeJSON(filePath, newData);
        return newData;
      }
      throw error;
    }
  }
}

module.exports = FileManager;