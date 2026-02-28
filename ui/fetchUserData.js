function fetchUserData(userId) {
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
        isActive: data.status === 'active',
        lastLogin: new Date(data.last_login)
      };
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      return null;
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
            displayUserData(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
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

// Example usage
fetchUserData(1);async function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
            
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt === maxRetries) {
                throw new Error(`Failed to fetch user data after ${maxRetries} attempts`);
            }
            
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
}