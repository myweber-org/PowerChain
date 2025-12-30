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
      const processedData = {
        id: data.id,
        name: data.name.toUpperCase(),
        email: data.email,
        isActive: data.status === 'active',
        lastLogin: new Date(data.last_login)
      };
      return processedData;
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      throw error;
    });
}