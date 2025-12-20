function fetchUserData(apiUrl) {
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                active: user.status === 'active'
            }));
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            return [];
        });
}