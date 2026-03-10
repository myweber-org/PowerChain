function fetchUserData(userId, maxRetries = 3) {
    const apiUrl = `https://api.example.com/users/${userId}`;
    let retryCount = 0;

    function attemptFetch() {
        return fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                if (retryCount < maxRetries) {
                    retryCount++;
                    console.warn(`Fetch attempt ${retryCount} failed. Retrying...`);
                    return new Promise(resolve => {
                        setTimeout(() => resolve(attemptFetch()), 1000 * retryCount);
                    });
                } else {
                    throw new Error(`Failed to fetch user data after ${maxRetries} attempts: ${error.message}`);
                }
            });
    }

    return attemptFetch();
}function fetchUserData(userId) {
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
}const userDataCache = new Map();

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

export { fetchUserData, clearUserCache };