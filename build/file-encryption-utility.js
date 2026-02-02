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
        if (!Buffer.isBuffer(data)) {
            data = Buffer.from(data);
        }

        const cipher = crypto.createCipheriv(this.algorithm, key, iv);
        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
        
        return {
            encryptedData: encrypted,
            iv: iv,
            key: key
        };
    }

    decryptFile(encryptedData, key, iv) {
        const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
        const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
        
        return decrypted;
    }

    encryptFileWithPassword(data, password) {
        const salt = crypto.randomBytes(16);
        const key = crypto.pbkdf2Sync(password, salt, 100000, this.keyLength, 'sha256');
        const iv = this.generateIV();
        
        const cipher = crypto.createCipheriv(this.algorithm, key, iv);
        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
        
        return {
            encryptedData: encrypted,
            iv: iv,
            salt: salt
        };
    }

    decryptFileWithPassword(encryptedData, password, salt, iv) {
        const key = crypto.pbkdf2Sync(password, salt, 100000, this.keyLength, 'sha256');
        const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
        const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
        
        return decrypted;
    }

    hashFile(data) {
        return crypto.createHash('sha256').update(data).digest('hex');
    }

    verifyFileHash(data, expectedHash) {
        const actualHash = this.hashFile(data);
        return crypto.timingSafeEqual(
            Buffer.from(actualHash, 'hex'),
            Buffer.from(expectedHash, 'hex')
        );
    }
}

module.exports = FileEncryptionUtility;