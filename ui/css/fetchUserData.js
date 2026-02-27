const fetchUserData = async (userId, maxRetries = 3) => {
    const fetchData = async (attempt) => {
        try {
            const response = await fetch(`https://api.example.com/users/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            if (attempt < maxRetries) {
                console.warn(`Attempt ${attempt + 1} failed. Retrying...`);
                return fetchData(attempt + 1);
            } else {
                console.error(`Failed after ${maxRetries} attempts:`, error);
                throw error;
            }
        }
    };
    return fetchData(0);
};function fetchUserData(userId) {
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
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
        `;
    }
}

// Example usage
fetchUserData(1);async function fetchUserData(userId) {
    const apiUrl = `https://api.example.com/users/${userId}`;
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        
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

function validateUserId(userId) {
    if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid user ID provided');
    }
    
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(userId)) {
        throw new Error('User ID must be a valid UUID');
    }
    
    return true;
}

export { fetchUserData, validateUserId };
async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        return {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            isActive: userData.status === 'active',
            lastLogin: new Date(userData.last_login)
        };
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
}function fetchUserData(userId) {
  const cacheKey = `user_${userId}`;
  const cachedData = localStorage.getItem(cacheKey);
  
  if (cachedData) {
    return Promise.resolve(JSON.parse(cachedData));
  }
  
  return fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      localStorage.setItem(cacheKey, JSON.stringify(data));
      return data;
    })
    .catch(error => {
      console.error('Failed to fetch user data:', error);
      throw error;
    });
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
            console.log('User Data:', {
                id: data.id,
                name: data.name,
                email: data.email,
                company: data.company.name
            });
            return data;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            throw error;
        });
}

function displayUserInfo(userData) {
    const outputDiv = document.getElementById('userOutput');
    if (outputDiv && userData) {
        outputDiv.innerHTML = `
            <h3>User Information</h3>
            <p><strong>ID:</strong> ${userData.id}</p>
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Company:</strong> ${userData.company.name}</p>
        `;
    }
}

function initUserFetch() {
    const userId = 1;
    fetchUserData(userId)
        .then(data => displayUserInfo(data))
        .catch(error => console.error('Initialization failed:', error));
}

document.addEventListener('DOMContentLoaded', initUserFetch);