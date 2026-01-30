const crypto = require('crypto');

class FileEncryption {
  constructor(key) {
    if (!key || key.length !== 32) {
      throw new Error('Encryption key must be 32 bytes for AES-256');
    }
    this.key = Buffer.from(key);
  }

  encrypt(data) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', this.key, iv);
    
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return {
      iv: iv.toString('hex'),
      content: encrypted
    };
  }

  decrypt(encryptedData) {
    const iv = Buffer.from(encryptedData.iv, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, iv);
    
    let decrypted = decipher.update(encryptedData.content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  static generateKey() {
    return crypto.randomBytes(32).toString('hex');
  }
}

module.exports = FileEncryption;