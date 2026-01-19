function fetchUserData(userId) {
    const apiUrl = `https://api.example.com/users/${userId}`;
    
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User data fetched successfully:', data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            throw error;
        });
}function fetchUserData(userId) {
    const cacheKey = `user_${userId}`;
    const cachedData = localStorage.getItem(cacheKey);
    
    if (cachedData) {
        return Promise.resolve(JSON.parse(cachedData));
    }
    
    return fetch(`https://api.example.com/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem(cacheKey, JSON.stringify(data));
            return data;
        })
        .catch(error => {
            console.error('Failed to fetch user data:', error);
            throw error;
        });
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
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const userData = await response.json();
    
    localStorage.setItem(cacheKey, JSON.stringify({
      data: userData,
      timestamp: Date.now()
    }));
    
    return userData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    
    if (cachedData) {
      const { data } = JSON.parse(cachedData);
      console.warn('Returning stale cached data');
      return data;
    }
    
    throw error;
  }
}