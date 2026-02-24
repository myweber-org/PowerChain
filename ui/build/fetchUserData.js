async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        return {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            isActive: userData.status === 'active'
        };
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
}