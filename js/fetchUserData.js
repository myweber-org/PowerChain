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
            displayUserData(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            displayError(error.message);
        });
}

function displayUserData(user) {
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

function displayError(errorMessage) {
    const outputDiv = document.getElementById('userOutput');
    if (outputDiv) {
        outputDiv.innerHTML = `<p class="error">Error: ${errorMessage}</p>`;
    }
}function fetchUserData(userId) {
  return fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('User data fetched successfully:', data);
      return data;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    let retryCount = 0;

    async function attemptFetch() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('User data fetched successfully:', data);
            return data;
        } catch (error) {
            retryCount++;
            if (retryCount <= maxRetries) {
                console.warn(`Attempt ${retryCount} failed. Retrying...`);
                await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
                return attemptFetch();
            } else {
                console.error('Max retries reached. Failed to fetch user data:', error);
                throw error;
            }
        }
    }

    return attemptFetch();
}async function fetchUserData(userId, maxRetries = 3) {
    const baseUrl = 'https://api.example.com/users';
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(`${baseUrl}/${userId}`);
            
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
            lastUpdated: new Date().toISOString()
        };
        
    } catch (error) {
        console.error('Failed to get user profile:', error.message);
        return null;
    }
}

export { fetchUserData, getUserProfile };function fetchUserData(userId) {
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

fetchUserData(1);function fetchUserData(userId) {
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
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

fetchUserData(1);