function validateUserInput(username, email) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernameRegex.test(username)) {
        throw new Error('Invalid username format');
    }

    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
    }

    return { username, email };
}