async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        console.log('User Data:', userData);
        return userData;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
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
            console.log(`User ID: ${data.id}`);
            console.log(`Name: ${data.name}`);
            console.log(`Email: ${data.email}`);
            console.log(`Company: ${data.company.name}`);
            return data;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            throw error;
        });
}

function displayUserInfo(userId) {
    fetchUserData(userId)
        .then(user => {
            const outputDiv = document.getElementById('userOutput');
            if (outputDiv) {
                outputDiv.innerHTML = `
                    <h3>User Information</h3>
                    <p><strong>ID:</strong> ${user.id}</p>
                    <p><strong>Name:</strong> ${user.name}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Company:</strong> ${user.company.name}</p>
                `;
            }
        })
        .catch(() => {
            const outputDiv = document.getElementById('userOutput');
            if (outputDiv) {
                outputDiv.innerHTML = '<p class="error">Failed to load user data</p>';
            }
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const loadButton = document.getElementById('loadUserBtn');
    if (loadButton) {
        loadButton.addEventListener('click', function() {
            const userIdInput = document.getElementById('userId');
            const userId = parseInt(userIdInput.value) || 1;
            displayUserInfo(userId);
        });
    }
});async function fetchUserData(userId, maxRetries = 3) {
    const baseUrl = 'https://api.example.com/users';
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(`${baseUrl}/${userId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const userData = await response.json();
            return userData;
            
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt === maxRetries) {
                throw new Error(`Failed to fetch user data after ${maxRetries} attempts`);
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
        
        console.log('User profile loaded successfully:', userData);
        return userData;
        
    } catch (error) {
        console.error('Failed to load user profile:', error.message);
        return null;
    }
}

export { fetchUserData, getUserProfile };function fetchUserData(userId) {
    const apiUrl = `https://api.example.com/users/${userId}`;
    
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return {
                id: data.id,
                name: data.name,
                email: data.email,
                active: data.status === 'active'
            };
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            return null;
        });
}function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    
    async function attemptFetch(retryCount) {
        try {
            const response = await fetch(url);
            
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
                throw new Error(`Failed to fetch user data after ${maxRetries} attempts`);
            }
        }
    }
    
    return attemptFetch(0);
}function fetchUserData(userId) {
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
            displayUserData(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

function displayUserData(user) {
    const outputDiv = document.getElementById('userData');
    if (outputDiv) {
        outputDiv.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
        `;
    }
}

// Example usage
fetchUserData(1);