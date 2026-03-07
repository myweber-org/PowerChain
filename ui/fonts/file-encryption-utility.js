const crypto = require('crypto');

class FileEncryptionUtility {
    constructor() {
        this.algorithm = 'aes-256-cbc';
        this.keyLength = 32;
        this.ivLength = 16;
    }

    generateKey() {
        return crypto.randomBytes(this.keyLength);
    }

    generateIV() {
        return crypto.randomBytes(this.ivLength);
    }

    encryptFile(data, key, iv) {
        const cipher = crypto.createCipheriv(this.algorithm, key, iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    decryptFile(encryptedData, key, iv) {
        const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    encryptWithPassword(data, password) {
        const salt = crypto.randomBytes(16);
        const key = crypto.scryptSync(password, salt, this.keyLength);
        const iv = this.generateIV();
        
        const cipher = crypto.createCipheriv(this.algorithm, key, iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        return {
            encryptedData: encrypted,
            salt: salt.toString('hex'),
            iv: iv.toString('hex')
        };
    }

    decryptWithPassword(encryptedData, password, saltHex, ivHex) {
        const salt = Buffer.from(saltHex, 'hex');
        const iv = Buffer.from(ivHex, 'hex');
        const key = crypto.scryptSync(password, salt, this.keyLength);
        
        const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted;
    }

    hashFile(data) {
        return crypto.createHash('sha256').update(data).digest('hex');
    }

    verifyIntegrity(data, expectedHash) {
        const actualHash = this.hashFile(data);
        return actualHash === expectedHash;
    }
}

module.exports = FileEncryptionUtility;