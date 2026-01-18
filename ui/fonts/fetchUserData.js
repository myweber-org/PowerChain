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

export { fetchUserData, clearUserDataCache };