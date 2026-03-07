function fetchUserData(userId) {
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
      displayUserInfo(data);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}

function displayUserInfo(user) {
  const outputDiv = document.getElementById('userInfo');
  if (outputDiv) {
    outputDiv.innerHTML = `
      <h3>${user.name}</h3>
      <p>Email: ${user.email}</p>
      <p>Phone: ${user.phone}</p>
      <p>Website: ${user.website}</p>
      <p>Company: ${user.company.name}</p>
    `;
  }
}

// Example usage
fetchUserData(1);async function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
            
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt === maxRetries) {
                throw new Error(`Failed to fetch user data after ${maxRetries} attempts`);
            }
            
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
}

function validateUserId(userId) {
    if (typeof userId !== 'string' && typeof userId !== 'number') {
        throw new TypeError('User ID must be a string or number');
    }
    
    if (typeof userId === 'string' && userId.trim() === '') {
        throw new Error('User ID cannot be empty');
    }
    
    return true;
}

async function getUserProfile(userId) {
    validateUserId(userId);
    
    try {
        const userData = await fetchUserData(userId);
        
        return {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            status: userData.active ? 'active' : 'inactive',
            lastUpdated: new Date().toISOString()
        };
    } catch (error) {
        console.error('Failed to get user profile:', error.message);
        return null;
    }
}

export { fetchUserData, getUserProfile };const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const userDataCache = new Map();

async function fetchUserData(userId) {
    if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid user ID provided');
    }

    const cached = userDataCache.get(userId);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log(`Returning cached data for user: ${userId}`);
        return cached.data;
    }

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        userDataCache.set(userId, {
            data: data,
            timestamp: Date.now()
        });

        console.log(`Fetched fresh data for user: ${userId}`);
        return data;
    } catch (error) {
        console.error(`Failed to fetch user data for ${userId}:`, error);
        
        // Return cached data even if expired when network fails
        if (cached) {
            console.log(`Falling back to expired cache for user: ${userId}`);
            return cached.data;
        }
        
        throw error;
    }
}

function clearUserCache(userId = null) {
    if (userId) {
        userDataCache.delete(userId);
        console.log(`Cleared cache for user: ${userId}`);
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('User Data:', data);
      displayUserInfo(data);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      displayErrorMessage(error.message);
    });
}

function displayUserInfo(user) {
  const outputDiv = document.getElementById('userOutput');
  if (outputDiv) {
    outputDiv.innerHTML = `
      <h3>${user.name}</h3>
      <p>Email: ${user.email}</p>
      <p>Phone: ${user.phone}</p>
      <p>Website: ${user.website}</p>
      <p>Company: ${user.company.name}</p>
    `;
  }
}

function displayErrorMessage(message) {
  const outputDiv = document.getElementById('userOutput');
  if (outputDiv) {
    outputDiv.innerHTML = `<p class="error">Failed to load user data: ${message}</p>`;
  }
}