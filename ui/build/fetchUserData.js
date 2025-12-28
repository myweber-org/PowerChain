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
            console.error('There was a problem with the fetch operation:', error);
        });
}

function displayUserInfo(user) {
    const userInfoDiv = document.getElementById('userInfo');
    if (userInfoDiv) {
        userInfoDiv.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const userId = 1;
    fetchUserData(userId);
});function fetchUserData(userId, maxRetries = 3) {
    const apiUrl = `https://api.example.com/users/${userId}`;
    
    async function attemptFetch(retryCount) {
        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return {
                success: true,
                data: data
            };
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
                error: error.message
            };
        }
    }
    
    return attemptFetch(0);
}

function processUserData(userData) {
    if (!userData.success) {
        console.error('Failed to fetch user data:', userData.error);
        return null;
    }
    
    const processedData = {
        id: userData.data.id,
        name: userData.data.name,
        email: userData.data.email,
        isActive: userData.data.status === 'active',
        lastLogin: new Date(userData.data.lastLogin)
    };
    
    console.log('User data processed successfully:', processedData);
    return processedData;
}

async function getUserProfile(userId) {
    const userData = await fetchUserData(userId);
    return processUserData(userData);
}

export { fetchUserData, processUserData, getUserProfile };