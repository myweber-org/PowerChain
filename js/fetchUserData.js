function fetchUserData(userId, cacheDuration = 300000) {
    const cacheKey = `user_${userId}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < cacheDuration) {
            console.log('Returning cached user data');
            return Promise.resolve(data);
        }
    }

    return fetch(`https://api.example.com/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(userData => {
            const cacheItem = {
                data: userData,
                timestamp: Date.now()
            };
            localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
            return userData;
        })
        .catch(error => {
            console.error('Failed to fetch user data:', error);
            throw error;
        });
}const USER_DATA_CACHE_KEY = 'userDataCache';
const CACHE_DURATION = 5 * 60 * 1000;

async function fetchUserData(userId, forceRefresh = false) {
    const cache = getCachedUserData(userId);
    
    if (!forceRefresh && cache && !isCacheExpired(cache.timestamp)) {
        console.log(`Returning cached data for user ${userId}`);
        return cache.data;
    }

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        cacheUserData(userId, userData);
        
        return userData;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        
        if (cache) {
            console.log('Falling back to cached data');
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

export { fetchUserData, clearUserDataCache };