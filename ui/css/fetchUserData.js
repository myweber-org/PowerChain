async function fetchUserData() {
    const url = 'https://jsonplaceholder.typicode.com/users/1';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        console.log('Fetched user data:', userData);
        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

fetchUserData();async function fetchUserData(userId, maxRetries = 3) {
    const baseUrl = 'https://api.example.com/users';
    
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
            console.error(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt === maxRetries) {
                return {
                    success: false,
                    error: error.message,
                    attempts: attempt
                };
            }
            
            await new Promise(resolve => 
                setTimeout(resolve, Math.pow(2, attempt) * 100)
            );
        }
    }
}

function validateUserId(userId) {
    return typeof userId === 'string' && 
           userId.length > 0 && 
           /^[a-zA-Z0-9_-]+$/.test(userId);
}

export { fetchUserData, validateUserId };async function fetchUserData(userId) {
  const cacheKey = `user_${userId}`;
  const cache = localStorage.getItem(cacheKey);
  
  if (cache) {
    const cachedData = JSON.parse(cache);
    if (Date.now() - cachedData.timestamp < 300000) {
      return cachedData.data;
    }
  }

  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const userData = await response.json();
    
    localStorage.setItem(cacheKey, JSON.stringify({
      data: userData,
      timestamp: Date.now()
    }));
    
    return userData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw new Error('Unable to retrieve user information');
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
        console.error('Error fetching user data:', error);
        return null;
    }
}

fetchUserData(1);function fetchUserData(userId) {
  const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
  
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
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