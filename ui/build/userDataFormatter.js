
function formatUserData(users) {
  return users.map(user => ({
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email.toLowerCase(),
    age: calculateAge(user.birthDate),
    isActive: user.status === 'active',
    lastLogin: formatDate(user.lastLogin)
  }));
}

function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

function formatDate(dateString) {
  if (!dateString) return 'Never';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export { formatUserData, calculateAge, formatDate };
function formatUserData(users) {
  return users.map(user => ({
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email.toLowerCase(),
    age: calculateAge(user.birthDate),
    isActive: user.status === 'active',
    formattedJoinDate: new Date(user.joinDate).toLocaleDateString('en-US')
  }));
}

function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}
function formatUserData(users) {
  return users.map(user => ({
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email.toLowerCase(),
    age: calculateAge(user.birthDate),
    isActive: user.status === 'active',
    lastLogin: formatDate(user.lastLogin)
  }));
}

function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

function formatDate(dateString) {
  if (!dateString) return 'Never';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export { formatUserData, calculateAge, formatDate };function formatUserData(users) {
  return users.map(user => ({
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email.toLowerCase(),
    age: user.age || 'N/A',
    isActive: user.status === 'active',
    lastLogin: user.lastLogin ? new Date(user.lastLogin).toISOString().split('T')[0] : 'Never'
  }));
}

function validateUserData(user) {
  const errors = [];
  
  if (!user.firstName || user.firstName.length < 2) {
    errors.push('First name must be at least 2 characters');
  }
  
  if (!user.email || !user.email.includes('@')) {
    errors.push('Valid email is required');
  }
  
  if (user.age && (user.age < 0 || user.age > 150)) {
    errors.push('Age must be between 0 and 150');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

export { formatUserData, validateUserData };
function formatUserData(users) {
  return users.map(user => ({
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email.toLowerCase(),
    age: calculateAge(user.birthDate),
    isActive: user.status === 'active',
    lastLogin: formatDate(user.lastLogin)
  }));
}

function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

function formatDate(dateString) {
  if (!dateString) return 'Never';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export { formatUserData, calculateAge, formatDate };