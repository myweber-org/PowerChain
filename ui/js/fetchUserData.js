
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const userDataCache = new Map();

async function fetchUserData(userId) {
    const cacheKey = `user_${userId}`;
    const cached = userDataCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log(`Returning cached data for user ${userId}`);
        return cached.data;
    }

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        
        userDataCache.set(cacheKey, {
            data: userData,
            timestamp: Date.now()
        });

        console.log(`Fetched fresh data for user ${userId}`);
        return userData;
    } catch (error) {
        console.error(`Failed to fetch data for user ${userId}:`, error);
        
        if (cached) {
            console.log(`Returning stale cached data for user ${userId}`);
            return cached.data;
        }
        
        throw error;
    }
}

function clearUserCache(userId = null) {
    if (userId) {
        userDataCache.delete(`user_${userId}`);
        console.log(`Cleared cache for user ${userId}`);
    } else {
        userDataCache.clear();
        console.log('Cleared all user cache');
    }
}

export { fetchUserData, clearUserCache };function fetchUserData(userId) {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('User Data:', data);
      displayUserData(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function displayUserData(user) {
  const container = document.getElementById('userContainer');
  if (container) {
    container.innerHTML = `
      <h2>${user.name}</h2>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Website:</strong> ${user.website}</p>
      <p><strong>Company:</strong> ${user.company.name}</p>
    `;
  }
}