async function fetchUserData(userId) {
  const apiUrl = `https://api.example.com/users/${userId}`;
  
  try {
    const response = await fetch(apiUrl);
    
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
    throw error;
  }
}async function fetchUserData(userId) {
  const cacheKey = `user_${userId}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    const data = JSON.parse(cached);
    if (Date.now() - data.timestamp < 300000) {
      return data.user;
    }
  }

  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const userData = await response.json();
    
    localStorage.setItem(cacheKey, JSON.stringify({
      user: userData,
      timestamp: Date.now()
    }));
    
    return userData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
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