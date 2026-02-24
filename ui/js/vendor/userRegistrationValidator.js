function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long" };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one uppercase letter" };
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one lowercase letter" };
  }
  
  if (!/\d/.test(password)) {
    return { valid: false, message: "Password must contain at least one digit" };
  }
  
  if (!/[!@#$%^&*]/.test(password)) {
    return { valid: false, message: "Password must contain at least one special character" };
  }
  
  return { valid: true, message: "Password is strong" };
}

function validateRegistration(userData) {
  const errors = [];
  
  if (!validateEmail(userData.email)) {
    errors.push("Invalid email format");
  }
  
  const passwordResult = validatePassword(userData.password);
  if (!passwordResult.valid) {
    errors.push(passwordResult.message);
  }
  
  if (userData.password !== userData.confirmPassword) {
    errors.push("Passwords do not match");
  }
  
  if (userData.age && (userData.age < 13 || userData.age > 120)) {
    errors.push("Age must be between 13 and 120");
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

module.exports = { validateRegistration, validateEmail, validatePassword };