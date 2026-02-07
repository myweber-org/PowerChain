const crypto = require('crypto');
const fs = require('fs');

class FileEncryptor {
    constructor(key) {
        this.algorithm = 'aes-256-cbc';
        this.key = crypto.createHash('sha256').update(String(key)).digest();
    }

    encryptFile(inputPath, outputPath) {
        return new Promise((resolve, reject) => {
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
            
            const input = fs.createReadStream(inputPath);
            const output = fs.createWriteStream(outputPath);
            
            output.write(iv);
            
            input.pipe(cipher).pipe(output);
            
            output.on('finish', () => {
                resolve(outputPath);
            });
            
            output.on('error', reject);
        });
    }

    decryptFile(inputPath, outputPath) {
        return new Promise((resolve, reject) => {
            const input = fs.createReadStream(inputPath);
            
            input.once('readable', () => {
                const iv = input.read(16);
                const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
                
                const output = fs.createWriteStream(outputPath);
                
                input.pipe(decipher).pipe(output);
                
                output.on('finish', () => {
                    resolve(outputPath);
                });
                
                output.on('error', reject);
            });
            
            input.on('error', reject);
        });
    }

    static generateRandomKey(length = 32) {
        return crypto.randomBytes(length).toString('hex');
    }
}

module.exports = FileEncryptor;