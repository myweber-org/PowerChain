function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhoneNumber(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function validateFormData(formData) {
    const errors = {};
    
    if (!validateEmail(formData.email)) {
        errors.email = 'Invalid email format';
    }
    
    if (!validatePhoneNumber(formData.phone)) {
        errors.phone = 'Invalid phone number format';
    }
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export { validateEmail, validatePhoneNumber, validateFormData };