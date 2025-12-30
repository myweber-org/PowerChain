function validatePassword(password, options = {}) {
    const defaults = {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        specialChars: "!@#$%^&*()_+-=[]{}|;:,.<>?"
    };
    
    const config = { ...defaults, ...options };
    const errors = [];
    
    if (password.length < config.minLength) {
        errors.push(`Password must be at least ${config.minLength} characters long`);
    }
    
    if (config.requireUppercase && !/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
    }
    
    if (config.requireLowercase && !/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter");
    }
    
    if (config.requireNumbers && !/\d/.test(password)) {
        errors.push("Password must contain at least one number");
    }
    
    if (config.requireSpecialChars) {
        const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
        if (!specialCharRegex.test(password)) {
            errors.push("Password must contain at least one special character");
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        score: calculatePasswordScore(password, config)
    };
}

function calculatePasswordScore(password, config) {
    let score = 0;
    
    if (password.length >= config.minLength) score += 25;
    if (password.length >= 12) score += 15;
    
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 20;
    if (/\d/.test(password)) score += 20;
    
    const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (specialCharRegex.test(password)) score += 20;
    
    const uniqueChars = new Set(password).size;
    if (uniqueChars / password.length > 0.7) score += 10;
    
    const commonPatterns = [/123/, /qwerty/, /password/, /admin/, /letmein/];
    if (!commonPatterns.some(pattern => pattern.test(password.toLowerCase()))) {
        score += 10;
    }
    
    return Math.min(score, 100);
}

function getStrengthLevel(score) {
    if (score >= 80) return { level: "strong", color: "#4CAF50" };
    if (score >= 60) return { level: "good", color: "#FFC107" };
    if (score >= 40) return { level: "fair", color: "#FF9800" };
    return { level: "weak", color: "#F44336" };
}

export { validatePassword, calculatePasswordScore, getStrengthLevel };function calculatePasswordEntropy(password) {
    const charSets = {
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numbers: /\d/.test(password),
        symbols: /[^a-zA-Z0-9]/.test(password)
    };
    
    const charSetCount = Object.values(charSets).filter(Boolean).length;
    let poolSize = 0;
    
    if (charSets.lowercase) poolSize += 26;
    if (charSets.uppercase) poolSize += 26;
    if (charSets.numbers) poolSize += 10;
    if (charSets.symbols) poolSize += 32;
    
    const entropy = Math.log2(Math.pow(poolSize, password.length));
    return {
        entropy: entropy,
        strength: getStrengthLevel(entropy),
        hasLowercase: charSets.lowercase,
        hasUppercase: charSets.uppercase,
        hasNumbers: charSets.numbers,
        hasSymbols: charSets.symbols
    };
}

function getStrengthLevel(entropy) {
    if (entropy < 40) return 'Very Weak';
    if (entropy < 60) return 'Weak';
    if (entropy < 80) return 'Moderate';
    if (entropy < 100) return 'Strong';
    return 'Very Strong';
}

function validatePasswordRequirements(password, minLength = 8) {
    const requirements = {
        minLength: password.length >= minLength,
        hasLowercase: /[a-z]/.test(password),
        hasUppercase: /[A-Z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSymbol: /[^a-zA-Z0-9]/.test(password)
    };
    
    const passed = Object.values(requirements).filter(Boolean).length;
    const total = Object.keys(requirements).length;
    
    return {
        requirements: requirements,
        score: Math.round((passed / total) * 100),
        isAcceptable: passed === total
    };
}

export { calculatePasswordEntropy, validatePasswordRequirements };