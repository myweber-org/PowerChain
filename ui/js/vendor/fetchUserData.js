const fetchUserData = async (userId, maxRetries = 3) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(`https://api.example.com/users/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`Successfully fetched data for user ${userId}`);
      return data;
      
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt} failed: ${error.message}`);
      
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw new Error(`Failed to fetch user data after ${maxRetries} attempts: ${lastError.message}`);
};

const validateUserData = (data) => {
  const requiredFields = ['id', 'name', 'email'];
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
  
  return true;
};

const processUserData = async (userId) => {
  try {
    const userData = await fetchUserData(userId);
    validateUserData(userData);
    
    const processedData = {
      ...userData,
      timestamp: new Date().toISOString(),
      isActive: userData.status === 'active'
    };
    
    console.log('User data processed successfully:', processedData);
    return processedData;
    
  } catch (error) {
    console.error('Failed to process user data:', error);
    throw error;
  }
};

export { fetchUserData, validateUserData, processUserData };function fetchUserData(userId) {
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
    const outputDiv = document.getElementById('user-info');
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
    const outputDiv = document.getElementById('user-info');
    if (outputDiv) {
        outputDiv.innerHTML = `<p class="error">Error: ${message}</p>`;
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
      const processedData = {
        id: data.id,
        name: data.name.toUpperCase(),
        email: data.email,
        isActive: data.status === 'active'
      };
      return processedData;
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      throw error;
    });
}const cache = new Map();

async function fetchUserData(userId) {
  if (cache.has(userId)) {
    console.log(`Returning cached data for user ${userId}`);
    return cache.get(userId);
  }

  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    cache.set(userId, data);
    console.log(`Fetched and cached data for user ${userId}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch data for user ${userId}:`, error);
    throw error;
  }
}

function clearCache() {
  cache.clear();
  console.log('Cache cleared');
}

export { fetchUserData, clearCache };function fetchUserData(userId, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new Error('Request timeout'));
    }, timeout);

    fetch(`https://api.example.com/users/${userId}`, { signal })
      .then(response => {
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid response format');
        }
        resolve(data);
      })
      .catch(error => {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
          reject(new Error('Request aborted due to timeout'));
        } else {
          reject(error);
        }
      });
  });
}

export default fetchUserData;function fetchUserData(userId, maxRetries = 3) {
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
                retryCount++;
                if (retryCount <= maxRetries) {
                    console.warn(`Attempt ${retryCount} failed. Retrying...`);
                    return attemptFetch();
                } else {
                    console.error('Max retries reached. Operation failed:', error);
                    throw error;
                }
            });
    }

    return attemptFetch();
}