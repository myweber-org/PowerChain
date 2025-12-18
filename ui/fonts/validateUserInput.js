function validateUserInput(input, type) {
    if (typeof input !== 'string') {
        return false;
    }

    const trimmedInput = input.trim();

    if (trimmedInput.length === 0) {
        return false;
    }

    switch (type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(trimmedInput);
        case 'username':
            const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
            return usernameRegex.test(trimmedInput);
        case 'password':
            return trimmedInput.length >= 8;
        default:
            return true;
    }
}