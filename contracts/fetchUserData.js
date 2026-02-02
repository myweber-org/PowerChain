function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    let retryCount = 0;

    async function attemptFetch() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('User data fetched successfully:', data);
            return data;
        } catch (error) {
            retryCount++;
            if (retryCount <= maxRetries) {
                console.warn(`Attempt ${retryCount} failed. Retrying...`);
                await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
                return attemptFetch();
            } else {
                console.error('Max retries reached. Failed to fetch user data:', error);
                throw error;
            }
        }
    }

    return attemptFetch();
}function fetchUserData(apiUrl) {
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.users) {
                return data.users.map(user => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    active: user.status === 'active'
                }));
            }
            return [];
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            throw error;
        });
}