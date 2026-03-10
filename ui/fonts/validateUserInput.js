function validateUserInput(input) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (input.includes('@')) {
    return emailRegex.test(input);
  } else {
    return usernameRegex.test(input);
  }
}