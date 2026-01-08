function validateUserProfile(formData) {
  const errors = {};
  
  if (!formData.username || formData.username.trim().length < 3) {
    errors.username = 'Username must be at least 3 characters';
  }
  
  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Valid email address is required';
  }
  
  if (formData.age && (formData.age < 0 || formData.age > 150)) {
    errors.age = 'Age must be between 0 and 150';
  }
  
  if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
    errors.website = 'Website must be a valid URL';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  };
}

export default validateUserProfile;