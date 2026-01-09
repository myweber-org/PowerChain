function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function sanitizeInput(input) {
    return input.trim()
        .replace(/[<>]/g, '')
        .substring(0, 255);
}

function validateFormData(data) {
    const errors = [];
    
    if (!validateEmail(data.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePhone(data.phone)) {
        errors.push('Invalid phone number');
    }
    
    if (data.name && data.name.length < 2) {
        errors.push('Name must be at least 2 characters');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        sanitizedData: {
            name: sanitizeInput(data.name || ''),
            email: sanitizeInput(data.email),
            phone: sanitizeInput(data.phone)
        }
    };
}

export { validateEmail, validatePhone, sanitizeInput, validateFormData };