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

function validateFormData(formData) {
    const errors = [];
    
    if (!validateEmail(formData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePhone(formData.phone)) {
        errors.push('Invalid phone number');
    }
    
    const sanitizedName = sanitizeInput(formData.name);
    if (sanitizedName.length < 2) {
        errors.push('Name must be at least 2 characters');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        sanitizedData: {
            name: sanitizedName,
            email: formData.email.toLowerCase(),
            phone: formData.phone.replace(/\D/g, '')
        }
    };
}

module.exports = {
    validateEmail,
    validatePhone,
    sanitizeInput,
    validateFormData
};