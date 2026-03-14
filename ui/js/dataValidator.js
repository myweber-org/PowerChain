function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhone(phone) {
    const regex = /^[\+]?[1-9][\d]{0,15}$/;
    return regex.test(phone);
}

function sanitizeInput(input) {
    return input.trim().replace(/[<>]/g, '');
}

module.exports = {
    validateEmail,
    validatePhone,
    sanitizeInput
};