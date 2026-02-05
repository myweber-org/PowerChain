async function fetchUserData(userId) {
  const cacheKey = `user_${userId}`;
  const cacheExpiry = 5 * 60 * 1000; // 5 minutes

  // Check cache first
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < cacheExpiry) {
      return data;
    }
  }

  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userData = await response.json();

    // Cache the response
    localStorage.setItem(cacheKey, JSON.stringify({
      data: userData,
      timestamp: Date.now()
    }));

    return userData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
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
        console.error('Failed to fetch user data:', error.message);
        return null;
    }
}