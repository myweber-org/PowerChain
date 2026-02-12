function fetchUserData(userId) {
  const apiUrl = `https://api.example.com/users/${userId}`;
  
  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('User data retrieved:', data);
      return processUserData(data);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      throw error;
    });
}

function processUserData(userData) {
  const processedData = {
    id: userData.id,
    fullName: `${userData.firstName} ${userData.lastName}`,
    email: userData.email,
    isActive: userData.status === 'active',
    lastLogin: new Date(userData.lastLogin),
    permissions: userData.permissions || []
  };
  
  return processedData;
}

export { fetchUserData, processUserData };