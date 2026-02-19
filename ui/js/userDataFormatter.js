
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
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
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
function formatUserData(users) {
    return users.map(user => ({
        id: user.id,
        fullName: `${user.firstName} ${user.lastName}`.trim(),
        email: user.email.toLowerCase(),
        age: user.age || 'N/A',
        isActive: user.status === 'active',
        formattedDate: user.createdAt 
            ? new Date(user.createdAt).toLocaleDateString('en-US')
            : 'Unknown'
    }));
}