async function fetchUserData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched user data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

const apiUrl = 'https://api.example.com/users';
fetchUserData(apiUrl);function fetchUserData(userId) {
  const apiUrl = `https://api.example.com/users/${userId}`;
  
  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const processedData = {
        id: data.id,
        name: data.name,
        email: data.email,
        isActive: data.status === 'active',
        lastLogin: new Date(data.lastLogin)
      };
      return processedData;
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      throw error;
    });
}