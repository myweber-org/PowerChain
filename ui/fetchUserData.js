const fetchUserData = async (userId, maxRetries = 3) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(`https://api.example.com/users/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return { success: true, data };
      
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt} failed:`, error.message);
      
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  return { 
    success: false, 
    error: `Failed after ${maxRetries} attempts: ${lastError.message}` 
  };
};

const validateUserData = (data) => {
  const requiredFields = ['id', 'name', 'email'];
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error('Invalid email format');
  }
  
  return true;
};

const processUserData = async (userId) => {
  try {
    const result = await fetchUserData(userId);
    
    if (!result.success) {
      throw new Error(result.error);
    }
    
    validateUserData(result.data);
    
    console.log('User data processed successfully:', result.data);
    return result.data;
    
  } catch (error) {
    console.error('Failed to process user data:', error.message);
    throw error;
  }
};

export { fetchUserData, validateUserData, processUserData };async function fetchUserData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('User data fetched successfully:', data);
        return data;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
}
async function fetchUserData(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
}