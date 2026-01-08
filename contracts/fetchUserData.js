async function fetchUserData(userId) {
  const cacheKey = `user_${userId}`;
  const cache = localStorage.getItem(cacheKey);
  const now = Date.now();
  
  if (cache) {
    const { data, timestamp } = JSON.parse(cache);
    if (now - timestamp < 300000) {
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
      timestamp: now
    }));
    
    return userData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
}