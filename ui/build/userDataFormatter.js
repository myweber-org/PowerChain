
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