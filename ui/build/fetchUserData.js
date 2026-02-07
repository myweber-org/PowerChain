function fetchUserData(userId) {
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
            console.error('Error fetching user data:', error.message);
        });
}

fetchUserData(1);function fetchUserData(userId) {
    const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
    
    fetch(url)
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
    const container = document.getElementById('user-info');
    if (container) {
        container.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
            <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
        `;
    }
}

function displayErrorMessage(message) {
    const container = document.getElementById('user-info');
    if (container) {
        container.innerHTML = `<p class="error">Failed to load user data: ${message}</p>`;
    }
}

// Example usage
document.addEventListener('DOMContentLoaded', function() {
    const userId = 1; // Default user ID
    fetchUserData(userId);
});function fetchUserData(userId) {
    return fetch(`https://api.example.com/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User data retrieved:', data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            throw error;
        });
}async function fetchUserData(userId, maxRetries = 3) {
    const baseUrl = 'https://api.example.com/users';
    let lastError;

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
            lastError = error;
            console.warn(`Attempt ${attempt} failed: ${error.message}`);
            
            if (attempt < maxRetries) {
                await new Promise(resolve => 
                    setTimeout(resolve, Math.pow(2, attempt) * 100)
                );
            }
        }
    }

    return {
        success: false,
        error: lastError.message,
        attempts: maxRetries
    };
}

function validateUserId(userId) {
    return typeof userId === 'string' && /^[a-zA-Z0-9-_]+$/.test(userId);
}

export { fetchUserData, validateUserId };const fetchUserData = async (userId, maxRetries = 3) => {
    const baseUrl = 'https://api.example.com/users';
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            const response = await fetch(`${baseUrl}/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            attempt++;
            console.error(`Attempt ${attempt} failed: ${error.message}`);
            if (attempt >= maxRetries) {
                throw new Error(`Failed to fetch user data after ${maxRetries} attempts`);
            }
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
};const userCache = new Map();

async function fetchUserData(userId) {
  if (userCache.has(userId)) {
    console.log(`Returning cached data for user ${userId}`);
    return userCache.get(userId);
  }

  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userData = await response.json();
    userCache.set(userId, userData);
    console.log(`Fetched and cached data for user ${userId}`);
    return userData;
  } catch (error) {
    console.error(`Failed to fetch user data for ${userId}:`, error);
    throw error;
  }
}

function clearUserCache(userId = null) {
  if (userId) {
    userCache.delete(userId);
    console.log(`Cleared cache for user ${userId}`);
  } else {
    userCache.clear();
    console.log('Cleared all user cache');
  }
}

export { fetchUserData, clearUserCache };const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const userDataCache = new Map();

async function fetchUserData(userId) {
    const cacheKey = `user_${userId}`;
    const cached = userDataCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log(`Returning cached data for user ${userId}`);
        return cached.data;
    }

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        
        userDataCache.set(cacheKey, {
            data: userData,
            timestamp: Date.now()
        });

        console.log(`Fetched fresh data for user ${userId}`);
        return userData;
    } catch (error) {
        console.error(`Failed to fetch data for user ${userId}:`, error);
        
        if (cached) {
            console.log(`Returning stale cached data for user ${userId}`);
            return cached.data;
        }
        
        throw error;
    }
}

function clearUserCache(userId = null) {
    if (userId) {
        userDataCache.delete(`user_${userId}`);
        console.log(`Cleared cache for user ${userId}`);
    } else {
        userDataCache.clear();
        console.log('Cleared all user cache');
    }
}

export { fetchUserData, clearUserCache };function fetchUserData(userId) {
  fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('User data:', data);
      displayUserData(data);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}

function displayUserData(user) {
  const container = document.getElementById('user-container');
  if (container) {
    container.innerHTML = `
      <h2>${user.name}</h2>
      <p>Email: ${user.email}</p>
      <p>Location: ${user.location}</p>
    `;
  }
}function fetchUserData(userId, maxRetries = 3) {
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
            if (retryCount < maxRetries) {
                console.warn(`Attempt ${retryCount + 1} failed. Retrying...`);
                await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
                return attemptFetch(retryCount + 1);
            } else {
                console.error('Max retries reached. Operation failed:', error);
                throw error;
            }
        }
    }

    return attemptFetch(0);
}