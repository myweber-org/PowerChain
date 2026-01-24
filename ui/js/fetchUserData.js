async function fetchUserData(userId) {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const userData = await response.json();
  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    active: userData.status === 'active',
    lastLogin: new Date(userData.last_login)
  };
}