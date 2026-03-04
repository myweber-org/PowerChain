
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
}