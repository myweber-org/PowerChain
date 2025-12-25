async function fetchUserData(userId, maxRetries = 3) {
    const baseUrl = 'https://api.example.com/users';
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            const response = await fetch(`${baseUrl}/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            attempt++;
            console.warn(`Attempt ${attempt} failed: ${error.message}`);
            if (attempt >= maxRetries) {
                throw new Error(`Failed to fetch user data after ${maxRetries} attempts: ${error.message}`);
            }
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
}async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        const processedData = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            isActive: userData.status === 'active'
        };
        console.log('User data processed:', processedData);
        return processedData;
    } catch (error) {
        console.error('Failed to fetch user data:', error.message);
        return null;
    }
}