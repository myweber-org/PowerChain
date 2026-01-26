function fetchUserData(userId, maxRetries = 3) {
    const apiUrl = `https://api.example.com/users/${userId}`;
    
    async function attemptFetch(retryCount) {
        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('User data fetched successfully:', data);
            return data;
            
        } catch (error) {
            console.error(`Attempt ${retryCount + 1} failed:`, error.message);
            
            if (retryCount < maxRetries - 1) {
                console.log(`Retrying in ${Math.pow(2, retryCount)} seconds...`);
                await new Promise(resolve => 
                    setTimeout(resolve, Math.pow(2, retryCount) * 1000)
                );
                return attemptFetch(retryCount + 1);
            } else {
                console.error('Max retries reached. Operation failed.');
                throw new Error('Failed to fetch user data after multiple attempts');
            }
        }
    }
    
    return attemptFetch(0);
}

function validateUserId(userId) {
    if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid user ID provided');
    }
    
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(userId)) {
        throw new Error('User ID must be a valid UUID format');
    }
    
    return true;
}

async function getUserProfile(userId) {
    try {
        validateUserId(userId);
        const userData = await fetchUserData(userId);
        
        return {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            lastUpdated: new Date().toISOString()
        };
        
    } catch (error) {
        console.error('Failed to get user profile:', error.message);
        return null;
    }
}

export { fetchUserData, getUserProfile, validateUserId };function fetchUserData(userId) {
    const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User Data:', data);
            displayUserInfo(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

function displayUserInfo(user) {
    const outputDiv = document.getElementById('userInfo');
    
    if (outputDiv) {
        outputDiv.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: ${user.website}</p>
            <p>Company: ${user.company.name}</p>
        `;
    }
}

// Example usage
// fetchUserData(1);