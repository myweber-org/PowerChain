function validateRegistrationForm(formData) {
  const errors = {};
  
  if (!formData.username || formData.username.trim().length < 3) {
    errors.username = 'Username must be at least 3 characters long';
  }
  
  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!formData.password || formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }
  
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  if (formData.age && (isNaN(formData.age) || formData.age < 18)) {
    errors.age = 'You must be at least 18 years old';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  };
}