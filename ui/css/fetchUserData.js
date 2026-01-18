async function fetchUserData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();
  users.forEach(user => {
    console.log(`User ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
  });
}

fetchUserData();function fetchUserData(userId) {
  return fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('User data:', data);
      return data;
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    let retryCount = 0;

    function attemptFetch() {
        return fetch(url)
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
                    throw new Error(`Failed to fetch user data after ${maxRetries} retries: ${error.message}`);
                }
            });
    }

    return attemptFetch();
}

// Example usage
fetchUserData(123)
    .then(data => console.log('User data:', data))
    .catch(error => console.error('Error:', error));