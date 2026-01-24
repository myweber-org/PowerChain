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
}