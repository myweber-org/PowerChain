
function fetchUserData(userId) {
    return fetch(`https://api.example.com/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const processedData = {
                id: data.id,
                name: data.name.toUpperCase(),
                email: data.email,
                active: data.status === 'active',
                lastLogin: new Date(data.lastLogin).toLocaleDateString()
            };
            return processedData;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            throw error;
        });
}const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const userDataCache = new Map();

async function fetchUserData(userId) {
    if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid user ID provided');
    }

    const cached = userDataCache.get(userId);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        userDataCache.set(userId, {
            data: data,
            timestamp: Date.now()
        });

        return data;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw new Error(`Unable to retrieve data for user ${userId}`);
    }
}

function clearUserCache(userId = null) {
    if (userId) {
        userDataCache.delete(userId);
    } else {
        userDataCache.clear();
    }
}

export { fetchUserData, clearUserCache };async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        console.log(`User ID: ${userData.id}`);
        console.log(`Name: ${userData.name}`);
        console.log(`Email: ${userData.email}`);
        return userData;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
}

fetchUserData(1);