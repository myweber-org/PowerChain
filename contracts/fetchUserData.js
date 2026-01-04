async function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(`User data fetched successfully on attempt ${attempt}`);
            return data;
            
        } catch (error) {
            console.warn(`Attempt ${attempt} failed: ${error.message}`);
            
            if (attempt === maxRetries) {
                throw new Error(`Failed to fetch user data after ${maxRetries} attempts: ${error.message}`);
            }
            
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
}

function validateUserData(userData) {
    const requiredFields = ['id', 'name', 'email'];
    
    for (const field of requiredFields) {
        if (!userData[field]) {
            throw new Error(`Missing required field: ${field}`);
        }
    }
    
    return true;
}

async function getUserProfile(userId) {
    try {
        const userData = await fetchUserData(userId);
        validateUserData(userData);
        
        return {
            success: true,
            data: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                profileComplete: userData.profileComplete || false
            }
        };
    } catch (error) {
        console.error('Failed to get user profile:', error.message);
        return {
            success: false,
            error: error.message
        };
    }
}

export { fetchUserData, getUserProfile };