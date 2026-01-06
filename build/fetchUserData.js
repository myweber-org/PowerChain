function fetchUserData(userId, cacheDuration = 300000) {
    const cacheKey = `user_${userId}`;
    const cachedData = localStorage.getItem(cacheKey);
    const now = Date.now();

    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (now - timestamp < cacheDuration) {
            console.log(`Returning cached data for user ${userId}`);
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
                timestamp: now
            };
            localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
            return userData;
        })
        .catch(error => {
            console.error('Failed to fetch user data:', error);
            if (cachedData) {
                console.log('Falling back to expired cached data');
                return JSON.parse(cachedData).data;
            }
            throw error;
        });
}