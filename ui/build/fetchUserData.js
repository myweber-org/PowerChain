function fetchUserData(userId, cacheDuration = 300000) {
  const cacheKey = `user_${userId}`;
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < cacheDuration) {
      return Promise.resolve(data);
    }
    localStorage.removeItem(cacheKey);
  }

  return fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(userData => {
      const cacheObject = {
        data: userData,
        timestamp: Date.now()
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheObject));
      return userData;
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
            displayErrorMessage(error.message);
        });
}

function displayUserInfo(user) {
    const outputDiv = document.getElementById('userInfo');
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
    const outputDiv = document.getElementById('userInfo');
    if (outputDiv) {
        outputDiv.innerHTML = `<p class="error">Error: ${message}</p>`;
    }
}async function fetchUserData(userId, cacheDuration = 300000) {
  const cacheKey = `user_${userId}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < cacheDuration) {
      return data;
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
    
    if (cached) {
      const { data } = JSON.parse(cached);
      console.warn('Returning stale cached data due to fetch failure');
      return data;
    }
    
    throw error;
  }
}function fetchUserData(userId, maxRetries = 3) {
    const apiUrl = `https://api.example.com/users/${userId}`;
    let retryCount = 0;

    function attemptFetch() {
        return fetch(apiUrl)
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