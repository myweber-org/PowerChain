async function fetchUserData(userId) {
  const apiUrl = `https://api.example.com/users/${userId}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const userData = await response.json();
    
    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      isActive: userData.status === 'active',
      lastLogin: new Date(userData.last_login)
    };
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
}