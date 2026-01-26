function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateUserInput(username, email) {
    const errors = [];
    
    if (!validateUsername(username)) {
        errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores.');
    }
    
    if (!validateEmail(email)) {
        errors.push('Please enter a valid email address.');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = validateUserInput;
function validateUserInput(input, type) {
  const trimmedInput = input.trim();

  if (type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(trimmedInput);
  }

  if (type === 'username') {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(trimmedInput);
  }

  if (type === 'password') {
    return trimmedInput.length >= 8 && 
           /[A-Z]/.test(trimmedInput) && 
           /[a-z]/.test(trimmedInput) && 
           /\d/.test(trimmedInput);
  }

  if (type === 'phone') {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(trimmedInput.replace(/\s/g, ''));
  }

  return false;
}