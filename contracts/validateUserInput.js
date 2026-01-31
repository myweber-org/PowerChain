function validateUserInput(username, password) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!usernameRegex.test(username)) {
        throw new Error('Invalid username format');
    }

    if (!passwordRegex.test(password)) {
        throw new Error('Password must be at least 8 characters with letters and numbers');
    }

    return { username, password };
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
}