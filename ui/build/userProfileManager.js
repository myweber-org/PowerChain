function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateAge(age) {
  return Number.isInteger(age) && age >= 0 && age <= 120;
}

function updateUserProfile(userData) {
  const errors = [];
  
  if (!userData.name || userData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!validateEmail(userData.email)) {
    errors.push('Invalid email format');
  }
  
  if (!validateAge(userData.age)) {
    errors.push('Age must be between 0 and 120');
  }
  
  if (errors.length > 0) {
    return {
      success: false,
      errors: errors
    };
  }
  
  const updatedProfile = {
    id: userData.id || Date.now(),
    name: userData.name.trim(),
    email: userData.email.toLowerCase(),
    age: userData.age,
    lastUpdated: new Date().toISOString()
  };
  
  return {
    success: true,
    profile: updatedProfile
  };
}

function getUserProfileSummary(profile) {
  return `${profile.name}, ${profile.age} years old (${profile.email})`;
}

export { updateUserProfile, getUserProfileSummary, validateEmail, validateAge };