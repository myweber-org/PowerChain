const crypto = require('crypto');

class FileEncryptionUtility {
  constructor() {
    this.algorithm = 'aes-256-gcm';
    this.keyLength = 32;
    this.ivLength = 16;
    this.authTagLength = 16;
  }

  generateKey() {
    return crypto.randomBytes(this.keyLength);
  }

  encryptFile(data, key) {
    if (!Buffer.isBuffer(data)) {
      data = Buffer.from(data);
    }

    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipheriv(this.algorithm, key, iv);
    
    const encrypted = Buffer.concat([
      cipher.update(data),
      cipher.final()
    ]);
    
    const authTag = cipher.getAuthTag();
    
    return Buffer.concat([iv, authTag, encrypted]);
  }

  decryptFile(encryptedData, key) {
    if (!Buffer.isBuffer(encryptedData)) {
      throw new Error('Encrypted data must be a Buffer');
    }

    const iv = encryptedData.slice(0, this.ivLength);
    const authTag = encryptedData.slice(this.ivLength, this.ivLength + this.authTagLength);
    const encryptedContent = encryptedData.slice(this.ivLength + this.authTagLength);

    const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
    decipher.setAuthTag(authTag);

    return Buffer.concat([
      decipher.update(encryptedContent),
      decipher.final()
    ]);
  }

  async encryptFileAsync(data, key) {
    return new Promise((resolve, reject) => {
      try {
        const result = this.encryptFile(data, key);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  async decryptFileAsync(encryptedData, key) {
    return new Promise((resolve, reject) => {
      try {
        const result = this.decryptFile(encryptedData, key);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = FileEncryptionUtility;