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
            console.log('User Data:', data);
            displayUserInfo(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            displayErrorMessage('Failed to load user information.');
        });
}

function displayUserInfo(user) {
    const container = document.getElementById('user-info');
    if (container) {
        container.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
        `;
    }
}

function displayErrorMessage(message) {
    const container = document.getElementById('user-info');
    if (container) {
        container.innerHTML = `<p class="error">${message}</p>`;
    }
}function fetchUserData(userId, cacheDuration = 300000) {
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
}function fetchUserData(apiUrl) {
  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const processedData = data.map(user => ({
        id: user.id,
        name: user.name.toUpperCase(),
        email: user.email.toLowerCase(),
        active: user.status === 'active'
      }));
      return processedData;
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      return [];
    });
}