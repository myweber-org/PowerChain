async function fetchUserData(userId, maxRetries = 3) {
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

async function getUserData(userId) {
    try {
        const userData = await fetchUserData(userId);
        validateUserData(userData);
        return userData;
    } catch (error) {
        console.error('Failed to get user data:', error.message);
        return null;
    }
}

export { fetchUserData, validateUserData, getUserData };async function fetchUserData(userId, maxRetries = 3) {
    const apiUrl = `https://api.example.com/users/${userId}`;
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('User data fetched successfully:', data);
            return data;
            
        } catch (error) {
            attempt++;
            console.error(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt === maxRetries) {
                console.error('Max retries reached. Operation failed.');
                throw new Error('Failed to fetch user data after multiple attempts');
            }
            
            const delay = Math.pow(2, attempt) * 1000;
            console.log(`Retrying in ${delay/1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

function validateUserId(userId) {
    if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid user ID provided');
    }
    return userId.trim();
}

async function processUserRequest(userId) {
    try {
        const validId = validateUserId(userId);
        const userData = await fetchUserData(validId);
        return { success: true, data: userData };
    } catch (error) {
        console.error('User request processing failed:', error);
        return { success: false, error: error.message };
    }
}

export { fetchUserData, processUserRequest };