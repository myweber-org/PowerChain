const USER_CACHE_KEY = 'userDataCache';
const CACHE_DURATION = 5 * 60 * 1000;

async function fetchUserData(userId, forceRefresh = false) {
    const cacheEntry = getCachedUserData(userId);
    
    if (!forceRefresh && cacheEntry && !isCacheExpired(cacheEntry.timestamp)) {
        return cacheEntry.data;
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
        
        if (cacheEntry) {
            console.warn('Returning cached data due to fetch failure');
            return cacheEntry.data;
        }
        
        throw error;
    }
}

function getCachedUserData(userId) {
    const cacheKey = `${USER_CACHE_KEY}_${userId}`;
    const cachedData = localStorage.getItem(cacheKey);
    
    if (!cachedData) return null;
    
    try {
        return JSON.parse(cachedData);
    } catch {
        localStorage.removeItem(cacheKey);
        return null;
    }
}

function cacheUserData(userId, data) {
    const cacheKey = `${USER_CACHE_KEY}_${userId}`;
    const cacheEntry = {
        data: data,
        timestamp: Date.now()
    };
    
    try {
        localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
    } catch (error) {
        console.warn('Failed to cache user data:', error);
    }
}

function isCacheExpired(timestamp) {
    return Date.now() - timestamp > CACHE_DURATION;
}

function clearUserCache(userId = null) {
    if (userId) {
        localStorage.removeItem(`${USER_CACHE_KEY}_${userId}`);
    } else {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(USER_CACHE_KEY)) {
                localStorage.removeItem(key);
            }
        });
    }
}

export { fetchUserData, clearUserCache };