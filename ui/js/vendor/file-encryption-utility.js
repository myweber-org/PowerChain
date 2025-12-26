const crypto = require('crypto');
const fs = require('fs');

class FileEncryptor {
    constructor() {
        this.algorithm = 'aes-256-cbc';
        this.keyLength = 32;
        this.ivLength = 16;
        this.saltLength = 64;
        this.iterations = 100000;
        this.digest = 'sha512';
    }

    deriveKey(password, salt) {
        return crypto.pbkdf2Sync(
            password,
            salt,
            this.iterations,
            this.keyLength,
            this.digest
        );
    }

    encryptFile(inputPath, outputPath, password) {
        try {
            const salt = crypto.randomBytes(this.saltLength);
            const iv = crypto.randomBytes(this.ivLength);
            const key = this.deriveKey(password, salt);
            
            const cipher = crypto.createCipheriv(this.algorithm, key, iv);
            const input = fs.createReadStream(inputPath);
            const output = fs.createWriteStream(outputPath);
            
            output.write(salt);
            output.write(iv);
            
            input.pipe(cipher).pipe(output);
            
            return new Promise((resolve, reject) => {
                output.on('finish', () => resolve(outputPath));
                output.on('error', reject);
            });
        } catch (error) {
            throw new Error(`Encryption failed: ${error.message}`);
        }
    }

    decryptFile(inputPath, outputPath, password) {
        try {
            const input = fs.createReadStream(inputPath);
            const salt = Buffer.alloc(this.saltLength);
            const iv = Buffer.alloc(this.ivLength);
            
            return new Promise((resolve, reject) => {
                input.once('readable', () => {
                    input.read(this.saltLength).copy(salt);
                    input.read(this.ivLength).copy(iv);
                    
                    const key = this.deriveKey(password, salt);
                    const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
                    const output = fs.createWriteStream(outputPath);
                    
                    input.pipe(decipher).pipe(output);
                    
                    output.on('finish', () => resolve(outputPath));
                    output.on('error', reject);
                });
                
                input.on('error', reject);
            });
        } catch (error) {
            throw new Error(`Decryption failed: ${error.message}`);
        }
    }

    generateRandomPassword(length = 32) {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        let password = '';
        
        for (let i = 0; i < length; i++) {
            const randomIndex = crypto.randomInt(0, charset.length);
            password += charset[randomIndex];
        }
        
        return password;
    }
}

module.exports = FileEncryptor;