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
}