async function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log(`Successfully fetched data for user ${userId}`);
            return data;
            
        } catch (error) {
            console.error(`Attempt ${attempt} failed: ${error.message}`);
            
            if (attempt === maxRetries) {
                throw new Error(`Failed to fetch user data after ${maxRetries} attempts`);
            }
            
            const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
            console.log(`Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

function validateUserId(userId) {
    if (typeof userId !== 'string' && typeof userId !== 'number') {
        throw new TypeError('User ID must be a string or number');
    }
    
    if (typeof userId === 'string' && userId.trim() === '') {
        throw new Error('User ID cannot be empty');
    }
    
    return String(userId).trim();
}

async function getUserProfile(userId) {
    try {
        const validatedId = validateUserId(userId);
        const userData = await fetchUserData(validatedId);
        
        return {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            profilePicture: userData.avatar,
            lastActive: new Date(userData.last_seen)
        };
        
    } catch (error) {
        console.error('Failed to get user profile:', error);
        return null;
    }
}

export { fetchUserData, getUserProfile };