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

const fileManager = new FileManager();