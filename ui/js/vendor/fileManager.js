const fs = require('fs');
const path = require('path');

class FileManager {
  constructor(basePath) {
    this.basePath = basePath;
  }

  validatePath(filePath) {
    const fullPath = path.join(this.basePath, filePath);
    const normalizedPath = path.normalize(fullPath);
    
    if (!normalizedPath.startsWith(path.normalize(this.basePath))) {
      throw new Error('Path traversal attempt detected');
    }
    
    return normalizedPath;
  }

  async readFile(filePath) {
    try {
      const safePath = this.validatePath(filePath);
      const content = await fs.promises.readFile(safePath, 'utf-8');
      return { success: true, data: content };
    } catch (error) {
      return { 
        success: false, 
        error: error.message,
        code: error.code || 'UNKNOWN_ERROR'
      };
    }
  }

  async writeFile(filePath, content) {
    try {
      const safePath = this.validatePath(filePath);
      const dir = path.dirname(safePath);
      
      await fs.promises.mkdir(dir, { recursive: true });
      await fs.promises.writeFile(safePath, content, 'utf-8');
      
      return { success: true, path: safePath };
    } catch (error) {
      return { 
        success: false, 
        error: error.message,
        code: error.code || 'UNKNOWN_ERROR'
      };
    }
  }

  async listFiles(directoryPath = '') {
    try {
      const safePath = this.validatePath(directoryPath);
      const items = await fs.promises.readdir(safePath, { withFileTypes: true });
      
      const files = items
        .filter(item => item.isFile())
        .map(item => ({
          name: item.name,
          type: 'file'
        }));
      
      const directories = items
        .filter(item => item.isDirectory())
        .map(item => ({
          name: item.name,
          type: 'directory'
        }));
      
      return { 
        success: true, 
        data: { files, directories }
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message,
        code: error.code || 'UNKNOWN_ERROR'
      };
    }
  }
}

module.exports = FileManager;