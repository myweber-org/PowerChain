function validatePasswordStrength(password) {
    const validations = [
        { pattern: /.{8,}/, score: 1, message: 'At least 8 characters' },
        { pattern: /[a-z]/, score: 1, message: 'Contains lowercase letter' },
        { pattern: /[A-Z]/, score: 1, message: 'Contains uppercase letter' },
        { pattern: /\d/, score: 1, message: 'Contains number' },
        { pattern: /[!@#$%^&*(),.?":{}|<>]/, score: 1, message: 'Contains special character' },
        { pattern: /^\S*$/, score: 1, message: 'No whitespace' }
    ];

    let totalScore = 0;
    const messages = [];

    validations.forEach(validation => {
        if (validation.pattern.test(password)) {
            totalScore += validation.score;
        } else {
            messages.push(`Missing: ${validation.message}`);
        }
    });

    let strength;
    if (totalScore >= 5) {
        strength = 'STRONG';
    } else if (totalScore >= 3) {
        strength = 'MEDIUM';
    } else {
        strength = 'WEAK';
    }

    return {
        isValid: totalScore >= 4,
        strength: strength,
        score: totalScore,
        maxScore: validations.length,
        messages: messages,
        suggestions: totalScore < 4 ? [
            'Add more character types',
            'Increase length to 12+ characters',
            'Avoid common patterns'
        ] : []
    };
}

function generateSecurePassword(length = 12) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    
    return password;
}

export { validatePasswordStrength, generateSecurePassword };function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (password.length < minLength) {
        return { valid: false, message: "Password must be at least 8 characters long" };
    }
    if (!hasUpperCase) {
        return { valid: false, message: "Password must contain at least one uppercase letter" };
    }
    if (!hasLowerCase) {
        return { valid: false, message: "Password must contain at least one lowercase letter" };
    }
    if (!hasNumbers) {
        return { valid: false, message: "Password must contain at least one number" };
    }
    if (!hasSpecialChar) {
        return { valid: false, message: "Password must contain at least one special character" };
    }
    
    return { valid: true, message: "Password is strong" };
}