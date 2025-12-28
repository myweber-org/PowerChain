function fetchUserData(userId, maxRetries = 3) {
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
            .catch(error => {
                if (retryCount < maxRetries) {
                    retryCount++;
                    console.warn(`Retry ${retryCount} for user ${userId}`);
                    return attemptFetch();
                } else {
                    throw new Error(`Failed to fetch user ${userId} after ${maxRetries} retries: ${error.message}`);
                }
            });
    }

    return attemptFetch();
}const fetchUserData = async (userId, maxRetries = 3) => {
  const baseUrl = 'https://api.example.com/users';
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(`${baseUrl}/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`Successfully fetched data for user ${userId}`);
      return data;
      
    } catch (error) {
      console.error(`Attempt ${attempt} failed: ${error.message}`);
      
      if (attempt === maxRetries) {
        throw new Error(`Failed to fetch user data after ${maxRetries} attempts`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
};

const validateUserData = (userData) => {
  const requiredFields = ['id', 'name', 'email'];
  return requiredFields.every(field => userData.hasOwnProperty(field));
};

const processUserData = async (userId) => {
  try {
    const userData = await fetchUserData(userId);
    
    if (!validateUserData(userData)) {
      throw new Error('Invalid user data structure');
    }
    
    console.log('Processing user data:', userData);
    return {
      success: true,
      data: userData,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('User data processing failed:', error.message);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};

export { fetchUserData, validateUserData, processUserData };async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        console.log('User Data:', userData);
        return userData;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
}