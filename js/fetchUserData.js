function fetchUserData(apiUrl) {
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                active: user.status === 'active'
            }));
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            return [];
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
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Company: ${user.company.name}</p>
        `;
    }
}

function displayErrorMessage(message) {
    const container = document.getElementById('user-info');
    if (container) {
        container.innerHTML = `<p class="error">Failed to load user data: ${message}</p>`;
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
            <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
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
});function fetchUserData(userId, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const controller = new AbortController();
        const signal = controller.signal;
        const timer = setTimeout(() => {
            controller.abort();
            reject(new Error('Request timeout'));
        }, timeout);

        fetch(`https://api.example.com/users/${userId}`, { signal })
            .then(response => {
                clearTimeout(timer);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => {
                clearTimeout(timer);
                if (error.name === 'AbortError') {
                    reject(new Error('Request was aborted due to timeout'));
                } else {
                    reject(error);
                }
            });
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
fetchUserData(1);function fetchUserData(userId, cacheDuration = 300000) {
  const cacheKey = `user_${userId}`;
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < cacheDuration) {
      console.log('Returning cached user data');
      return Promise.resolve(data);
    }
  }

  return fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(userData => {
      const cacheData = {
        data: userData,
        timestamp: Date.now()
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
      return userData;
    })
    .catch(error => {
      console.error('Failed to fetch user data:', error);
      throw error;
    });
}