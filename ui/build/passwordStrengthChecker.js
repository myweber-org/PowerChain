function calculatePasswordEntropy(password) {
    const charsetSize = getCharsetSize(password);
    const length = password.length;
    return Math.log2(Math.pow(charsetSize, length));
}

function getCharsetSize(password) {
    let size = 0;
    if (/[a-z]/.test(password)) size += 26;
    if (/[A-Z]/.test(password)) size += 26;
    if (/[0-9]/.test(password)) size += 10;
    if (/[^a-zA-Z0-9]/.test(password)) size += 32;
    return size;
}

function evaluateStrength(password) {
    const entropy = calculatePasswordEntropy(password);
    if (entropy < 28) return 'Very Weak';
    if (entropy < 36) return 'Weak';
    if (entropy < 60) return 'Moderate';
    if (entropy < 128) return 'Strong';
    return 'Very Strong';
}

module.exports = { calculatePasswordEntropy, evaluateStrength };