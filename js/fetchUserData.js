const userDataCache = new Map();

async function fetchUserData(userId) {
  if (userDataCache.has(userId)) {
    console.log(`Returning cached data for user ${userId}`);
    return userDataCache.get(userId);
  }

  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const userData = await response.json();
    userDataCache.set(userId, userData);
    console.log(`Fetched and cached data for user ${userId}`);
    return userData;
  } catch (error) {
    console.error(`Failed to fetch data for user ${userId}:`, error);
    throw error;
  }
}

function clearUserCache(userId = null) {
  if (userId) {
    userDataCache.delete(userId);
    console.log(`Cleared cache for user ${userId}`);
  } else {
    userDataCache.clear();
    console.log('Cleared all user cache');
  }
}

export { fetchUserData, clearUserCache };