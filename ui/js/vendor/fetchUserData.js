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
}