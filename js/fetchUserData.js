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

export { fetchUserData, clearUserCache };const userDataCache = new Map();

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
    
    const data = await response.json();
    userDataCache.set(userId, data);
    console.log(`Fetched and cached data for user ${userId}`);
    return data;
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

export { fetchUserData, clearUserCache };function fetchUserData(userId) {
    const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
    
    fetch(apiUrl)
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
            console.error('Error fetching user data:', error);
        });
}

function displayUserData(user) {
    const userInfoDiv = document.getElementById('userInfo');
    if (userInfoDiv) {
        userInfoDiv.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: ${user.website}</p>
        `;
    }
}function fetchUserData(userId) {
  fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('User data:', data);
      displayUserData(data);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}

function displayUserData(user) {
  const container = document.getElementById('user-data-container');
  if (container) {
    container.innerHTML = `
      <div>
        <h2>${user.name}</h2>
        <p>Email: ${user.email}</p>
        <p>Location: ${user.location}</p>
      </div>
    `;
  }
}function fetchUserData(userId, maxRetries = 3) {
    const fetchData = async (attempt = 1) => {
        try {
            const response = await fetch(`https://api.example.com/users/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('User data fetched successfully:', data);
            return data;
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error.message);
            if (attempt < maxRetries) {
                console.log(`Retrying... (${attempt + 1}/${maxRetries})`);
                return fetchData(attempt + 1);
            } else {
                console.error('Max retries reached. Operation failed.');
                throw new Error('Failed to fetch user data after multiple attempts');
            }
        }
    };
    return fetchData();
}