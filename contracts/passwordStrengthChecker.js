function calculatePasswordEntropy(password) {
    const charsetSize = getCharsetSize(password);
    const length = password.length;
    const entropy = Math.log2(Math.pow(charsetSize, length));
    return Math.round(entropy * 100) / 100;
}

function getCharsetSize(password) {
    let charset = 0;
    if (/[a-z]/.test(password)) charset += 26;
    if (/[A-Z]/.test(password)) charset += 26;
    if (/[0-9]/.test(password)) charset += 10;
    if (/[^a-zA-Z0-9]/.test(password)) charset += 32;
    return charset;
}

function evaluateStrength(entropy) {
    if (entropy < 40) return 'Weak';
    if (entropy < 60) return 'Moderate';
    if (entropy < 80) return 'Strong';
    return 'Very Strong';
}

function validatePassword(password) {
    if (password.length < 8) {
        return {
            valid: false,
            message: 'Password must be at least 8 characters long'
        };
    }
    
    const entropy = calculatePasswordEntropy(password);
    const strength = evaluateStrength(entropy);
    
    return {
        valid: true,
        entropy: entropy,
        strength: strength,
        message: `Password strength: ${strength} (${entropy} bits of entropy)`
    };
}

export { validatePassword, calculatePasswordEntropy, evaluateStrength };