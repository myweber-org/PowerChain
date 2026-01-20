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
            .then(data => {
                console.log('User data fetched successfully:', data);
                return data;
            })
            .catch(error => {
                retryCount++;
                if (retryCount <= maxRetries) {
                    console.warn(`Attempt ${retryCount} failed. Retrying...`);
                    return new Promise(resolve => {
                        setTimeout(() => resolve(attemptFetch()), 1000 * retryCount);
                    });
                } else {
                    console.error('Max retries reached. Operation failed:', error);
                    throw new Error('Failed to fetch user data after multiple attempts');
                }
            });
    }

    return attemptFetch();
}