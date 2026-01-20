function validateUserInput(username, email) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernameRegex.test(username)) {
        throw new Error('Invalid username. Must be 3-20 characters and contain only letters, numbers, and underscores.');
    }

    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format.');
    }

    return { username, email };
}function validateUserInput(username, email) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernameRegex.test(username)) {
        throw new Error('Invalid username format');
    }

    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
    }

    return { username, email };
}function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    return input.trim()
        .replace(/[<>]/g, '')
        .substring(0, 255);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /\d/.test(password);
}

module.exports = { sanitizeInput, validateEmail, validatePassword };