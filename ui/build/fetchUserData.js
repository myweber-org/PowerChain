async function fetchUserData(userId) {
    const apiUrl = `https://api.example.com/users/${userId}`;
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        
        // Process the data
        const processedData = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            isActive: userData.status === 'active',
            lastLogin: new Date(userData.last_login)
        };
        
        return processedData;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error;
    }
}

// Example usage
fetchUserData(123)
    .then(data => console.log('User data:', data))
    .catch(error => console.error('Error:', error));async function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(`Successfully fetched data for user ${userId}`);
            return data;
            
        } catch (error) {
            console.error(`Attempt ${attempt} failed: ${error.message}`);
            
            if (attempt === maxRetries) {
                throw new Error(`Failed to fetch user data after ${maxRetries} attempts`);
            }
            
            await new Promise(resolve => 
                setTimeout(resolve, Math.pow(2, attempt) * 1000)
            );
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
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
        throw new Error('Invalid email format');
    }
    
    return true;
}

async function getUserProfile(userId) {
    try {
        const userData = await fetchUserData(userId);
        validateUserData(userData);
        
        return {
            success: true,
            data: userData,
            timestamp: new Date().toISOString()
        };
        
    } catch (error) {
        console.error('Failed to get user profile:', error.message);
        return {
            success: false,
            error: error.message,
            userId: userId
        };
    }
}

export { fetchUserData, validateUserData, getUserProfile };