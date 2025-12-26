function validateUserInput(input, type) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (type === 'username') {
        return usernameRegex.test(input);
    } else if (type === 'email') {
        return emailRegex.test(input);
    }
    
    return false;
}