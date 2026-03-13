const CACHE_DURATION = 5 * 60 * 1000;
const userCache = new Map();

async function fetchUserData(userId) {
    const cached = userCache.get(userId);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        userCache.set(userId, {
            data: userData,
            timestamp: Date.now()
        });
        return userData;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        if (cached) {
            console.warn('Returning stale cached data due to fetch failure');
            return cached.data;
        }
        throw error;
    }
}function fetchUserData(userId) {
    const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('User Data:', data);
            displayUserInfo(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            displayErrorMessage(error.message);
        });
}

function displayUserInfo(user) {
    const outputDiv = document.getElementById('userOutput');
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

function displayErrorMessage(message) {
    const outputDiv = document.getElementById('userOutput');
    if (outputDiv) {
        outputDiv.innerHTML = `<p class="error">Error: ${message}</p>`;
    }
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchUserBtn');
    if (fetchButton) {
        fetchButton.addEventListener('click', () => {
            const userId = document.getElementById('userIdInput').value || 1;
            fetchUserData(userId);
        });
    }
});