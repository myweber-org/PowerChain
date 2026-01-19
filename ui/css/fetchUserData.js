async function fetchUserData(userId) {
    const apiUrl = `https://api.example.com/users/${userId}`;
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        
        const processedData = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            active: userData.status === 'active',
            lastLogin: new Date(userData.last_login)
        };
        
        return processedData;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error;
    }
}