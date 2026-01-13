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
}function validateUserInput(username, email) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!usernameRegex.test(username)) {
        return { valid: false, message: "Username must be 3-20 characters and contain only letters, numbers, and underscores." };
    }
    
    if (!emailRegex.test(email)) {
        return { valid: false, message: "Please enter a valid email address." };
    }
    
    return { valid: true, message: "Input validation passed." };
}