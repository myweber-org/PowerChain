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

export { validatePassword, calculatePasswordEntropy, evaluateStrength };function validatePassword(password, rules) {
    const errors = [];
    const checks = {
        minLength: (p, len) => p.length >= len,
        hasUppercase: (p) => /[A-Z]/.test(p),
        hasLowercase: (p) => /[a-z]/.test(p),
        hasNumber: (p) => /\d/.test(p),
        hasSpecial: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p),
        noSpaces: (p) => !/\s/.test(p)
    };

    rules.forEach(rule => {
        if (rule.required && !checks[rule.type](password, rule.value)) {
            errors.push(rule.message || `Password must meet ${rule.type} requirement`);
        }
    });

    return {
        isValid: errors.length === 0,
        errors: errors,
        score: calculateStrengthScore(password)
    };
}

function calculateStrengthScore(password) {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return Math.min(score, 5);
}

export { validatePassword, calculateStrengthScore };