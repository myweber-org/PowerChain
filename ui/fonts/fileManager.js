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

const fileManager = new FileManager();const fs = require('fs');
const path = require('path');

class FileManager {
  constructor(basePath) {
    this.basePath = basePath;
  }

  readFile(fileName) {
    const filePath = path.join(this.basePath, fileName);
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  writeFile(fileName, content) {
    const filePath = path.join(this.basePath, fileName);
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, content, 'utf8', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  deleteFile(fileName) {
    const filePath = path.join(this.basePath, fileName);
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  listFiles() {
    return new Promise((resolve, reject) => {
      fs.readdir(this.basePath, (err, files) => {
        if (err) reject(err);
        else resolve(files);
      });
    });
  }
}

module.exports = FileManager;