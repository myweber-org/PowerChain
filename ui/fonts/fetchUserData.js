function fetchUserData(userId) {
    const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
    
    fetch(apiUrl)
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
    const userInfoDiv = document.getElementById('userInfo');
    
    if (userInfoDiv) {
        userInfoDiv.innerHTML = `
            <h2>${user.name}</h2>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: ${user.website}</p>
            <p>Company: ${user.company.name}</p>
        `;
    }
}

// Example usage
fetchUserData(1);function fetchUserData(userId, maxRetries = 3) {
    const apiUrl = `https://api.example.com/users/${userId}`;
    
    async function attemptFetch(retryCount) {
        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error(`Attempt ${retryCount + 1} failed:`, error.message);
            
            if (retryCount < maxRetries - 1) {
                const delay = Math.pow(2, retryCount) * 1000;
                console.log(`Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return attemptFetch(retryCount + 1);
            }
            
            return { 
                success: false, 
                error: `Failed after ${maxRetries} attempts: ${error.message}` 
            };
        }
    }
    
    return attemptFetch(0);
}

function validateUserId(userId) {
    return typeof userId === 'string' && userId.trim().length > 0;
}

async function getUserProfile(userId) {
    if (!validateUserId(userId)) {
        return { success: false, error: 'Invalid user ID provided' };
    }
    
    const result = await fetchUserData(userId);
    
    if (result.success) {
        console.log('User data fetched successfully:', result.data);
        return result;
    } else {
        console.error('Failed to fetch user data:', result.error);
        return result;
    }
}

export { fetchUserData, getUserProfile };