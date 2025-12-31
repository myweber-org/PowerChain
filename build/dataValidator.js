function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhoneNumber(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function validateInput(input, type) {
    if (type === 'email') {
        return validateEmail(input);
    } else if (type === 'phone') {
        return validatePhoneNumber(input);
    }
    return false;
}

module.exports = {
    validateEmail,
    validatePhoneNumber,
    validateInput
};