async function fetchUserData() {
    const url = 'https://jsonplaceholder.typicode.com/users/1';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        console.log('Fetched user data:', userData);
        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

fetchUserData();