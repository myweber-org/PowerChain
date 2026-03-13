const CACHE_DURATION = 5 * 60 * 1000;
const userCache = new Map();

async function fetchUserData(userId) {
    const cached = userCache.get(userId);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        userCache.set(userId, {
            data: userData,
            timestamp: Date.now()
        });
        return userData;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        if (cached) {
            console.warn('Returning stale cached data due to fetch failure');
            return cached.data;
        }
        throw error;
    }
}