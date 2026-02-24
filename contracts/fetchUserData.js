async function fetchUserData(userId) {
  const cacheKey = `user_${userId}`;
  const cacheExpiry = 5 * 60 * 1000; // 5 minutes

  // Check cache first
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < cacheExpiry) {
      return data;
    }
  }

  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userData = await response.json();

    // Cache the response
    localStorage.setItem(cacheKey, JSON.stringify({
      data: userData,
      timestamp: Date.now()
    }));

    return userData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
}async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        console.log('User Data:', userData);
        return userData;
    } catch (error) {
        console.error('Failed to fetch user data:', error.message);
        return null;
    }
}const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const userDataCache = new Map();

async function fetchUserData(userId, forceRefresh = false) {
    const cacheKey = `user_${userId}`;
    const cached = userDataCache.get(cacheKey);

    if (!forceRefresh && cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
        console.log(`Returning cached data for user ${userId}`);
        return cached.data;
    }

    try {
        console.log(`Fetching fresh data for user ${userId}`);
        const response = await fetch(`https://api.example.com/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        
        userDataCache.set(cacheKey, {
            data: userData,
            timestamp: Date.now()
        });

        return userData;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        
        if (cached) {
            console.log('Returning stale cached data due to fetch error');
            return cached.data;
        }
        
        throw error;
    }
}

function clearUserCache(userId = null) {
    if (userId) {
        userDataCache.delete(`user_${userId}`);
    } else {
        userDataCache.clear();
    }
}

export { fetchUserData, clearUserCache };function fetchUserData(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('User data:', data);
      return data;
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      throw error;
    });
}function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    let retryCount = 0;

    function attemptFetch() {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('User data fetched successfully:', data);
                return data;
            })
            .catch(error => {
                if (retryCount < maxRetries) {
                    retryCount++;
                    console.warn(`Attempt ${retryCount} failed. Retrying...`);
                    return attemptFetch();
                } else {
                    console.error('Max retries reached. Operation failed:', error);
                    throw error;
                }
            });
    }

    return attemptFetch();
}const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const userDataCache = new Map();

async function fetchUserData(userId) {
    const cacheKey = `user_${userId}`;
    const cached = userDataCache.get(cacheKey);

    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
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
    } else {
        userDataCache.clear();
    }
}

export { fetchUserData, clearUserCache };function fetchUserData(userId) {
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
            displayUserData(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            displayErrorMessage(error.message);
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

function displayErrorMessage(message) {
    const outputDiv = document.getElementById('userOutput');
    if (outputDiv) {
        outputDiv.innerHTML = `<p class="error">Error: ${message}</p>`;
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
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
            <p><strong>Website:</strong> <a href="https://${user.website}" target="_blank">${user.website}</a></p>
        `;
    }
}

function displayErrorMessage(message) {
    const outputDiv = document.getElementById('userOutput');
    if (outputDiv) {
        outputDiv.innerHTML = `<p class="error">Failed to load user data: ${message}</p>`;
    }
}

// Example usage
document.addEventListener('DOMContentLoaded', function() {
    const userIdInput = document.getElementById('userIdInput');
    const fetchButton = document.getElementById('fetchButton');
    
    if (fetchButton && userIdInput) {
        fetchButton.addEventListener('click', function() {
            const userId = parseInt(userIdInput.value);
            if (userId && userId > 0) {
                fetchUserData(userId);
            } else {
                displayErrorMessage('Please enter a valid user ID');
            }
        });
    }
});