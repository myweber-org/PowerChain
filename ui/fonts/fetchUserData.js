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

export { fetchUserData, processUserData };async function fetchUserData(userId) {
    const apiUrl = `https://api.example.com/users/${userId}`;
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        
        const processedData = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            active: userData.status === 'active',
            lastLogin: new Date(userData.last_login)
        };
        
        return processedData;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
}async function fetchUserData(userId, cacheDuration = 300000) {
    const cacheKey = `user_${userId}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < cacheDuration) {
            return data;
        }
    }

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        
        const cacheObject = {
            data: userData,
            timestamp: Date.now()
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheObject));
        
        return userData;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error;
    }
}function fetchUserData(userId) {
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