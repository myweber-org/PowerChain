function fetchUserData(userId) {
    return fetch(`https://api.example.com/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return {
                id: data.id,
                name: data.name,
                email: data.email,
                isActive: data.status === 'active'
            };
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            throw error;
        });
}async function fetchUserData(userId, maxRetries = 3) {
    const baseUrl = 'https://api.example.com/users';
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(`${baseUrl}/${userId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return {
                success: true,
                data: data,
                attempts: attempt
            };
            
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt === maxRetries) {
                return {
                    success: false,
                    error: error.message,
                    attempts: attempt
                };
            }
            
            await new Promise(resolve => 
                setTimeout(resolve, Math.pow(2, attempt) * 100)
            );
        }
    }
}

function validateUserId(userId) {
    return typeof userId === 'string' && 
           userId.length > 0 && 
           /^[a-zA-Z0-9_-]+$/.test(userId);
}

async function processUserRequest(userId) {
    if (!validateUserId(userId)) {
        return {
            success: false,
            error: 'Invalid user ID format'
        };
    }
    
    const result = await fetchUserData(userId);
    
    if (result.success) {
        console.log(`User data fetched successfully in ${result.attempts} attempt(s)`);
        console.log('User data:', result.data);
    } else {
        console.error(`Failed to fetch user data after ${result.attempts} attempts`);
        console.error('Error:', result.error);
    }
    
    return result;
}

export { fetchUserData, validateUserId, processUserRequest };