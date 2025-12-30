const fetchUserData = async (userId, maxRetries = 3) => {
  const fetchWithRetry = async (attempt) => {
    try {
      const response = await fetch(`https://api.example.com/users/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('User data fetched successfully:', data);
      return data;
    } catch (error) {
      if (attempt < maxRetries) {
        console.warn(`Attempt ${attempt} failed. Retrying...`, error.message);
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        return fetchWithRetry(attempt + 1);
      } else {
        console.error('Max retries reached. Failed to fetch user data:', error);
        throw error;
      }
    }
  };

  return fetchWithRetry(1);
};