const USER_DATA_CACHE_KEY = 'userDataCache';
const CACHE_DURATION = 5 * 60 * 1000;

async function fetchUserData(userId, forceRefresh = false) {
    const cache = getCachedUserData(userId);
    
    if (!forceRefresh && cache && !isCacheExpired(cache.timestamp)) {
        return cache.data;
    }

    try {
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        cacheUserData(userId, userData);
        
        return userData;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        
        if (cache) {
            console.warn('Returning cached data due to fetch failure');
            return cache.data;
        }
        
        throw error;
    }
}

function getCachedUserData(userId) {
    const cacheKey = `${USER_DATA_CACHE_KEY}_${userId}`;
    const cached = localStorage.getItem(cacheKey);
    
    if (cached) {
        return JSON.parse(cached);
    }
    
    return null;
}

function cacheUserData(userId, data) {
    const cacheKey = `${USER_DATA_CACHE_KEY}_${userId}`;
    const cacheEntry = {
        data: data,
        timestamp: Date.now()
    };
    
    localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
}

function isCacheExpired(timestamp) {
    return Date.now() - timestamp > CACHE_DURATION;
}

function clearUserDataCache(userId = null) {
    if (userId) {
        const cacheKey = `${USER_DATA_CACHE_KEY}_${userId}`;
        localStorage.removeItem(cacheKey);
    } else {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(USER_DATA_CACHE_KEY)) {
                localStorage.removeItem(key);
            }
        });
    }
}

export { fetchUserData, clearUserDataCache };async function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`User data fetched successfully on attempt ${attempt}`);
            return data;
            
        } catch (error) {
            lastError = error;
            console.warn(`Attempt ${attempt} failed: ${error.message}`);
            
            if (attempt < maxRetries) {
                const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
                console.log(`Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    throw new Error(`Failed to fetch user data after ${maxRetries} attempts: ${lastError.message}`);
}

function validateUserId(userId) {
    if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid user ID provided');
    }
    
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(userId)) {
        throw new Error('User ID must be a valid UUID format');
    }
    
    return true;
}

async function getUserProfile(userId) {
    try {
        validateUserId(userId);
        const userData = await fetchUserData(userId);
        
        return {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            lastActive: new Date(userData.lastActive),
            profileComplete: userData.profileFields && userData.profileFields.length > 0
        };
        
    } catch (error) {
        console.error('Failed to get user profile:', error);
        throw error;
    }
}

export { fetchUserData, getUserProfile };function fetchUserData(userId) {
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
}async function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log(`Successfully fetched data for user ${userId}`);
            return data;
            
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt === maxRetries) {
                throw new Error(`Failed to fetch user data after ${maxRetries} attempts`);
            }
            
            const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
            console.log(`Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
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
    
    return String(userId).trim();
}

async function getUserProfile(userId) {
    try {
        const validatedId = validateUserId(userId);
        const userData = await fetchUserData(validatedId);
        
        return {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            profileComplete: Boolean(userData.profile && userData.profile.avatar)
        };
        
    } catch (error) {
        console.error('Failed to get user profile:', error.message);
        return null;
    }
}

export { fetchUserData, getUserProfile };function fetchUserData(userId) {
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
            displayUserData(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

function displayUserData(user) {
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

// Example usage
fetchUserData(1);