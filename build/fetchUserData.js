const fetchUserData = async (userId, maxRetries = 3) => {
    const fetchData = async (attempt) => {
        try {
            const response = await fetch(`https://api.example.com/users/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            if (attempt < maxRetries) {
                console.warn(`Attempt ${attempt} failed. Retrying...`);
                return fetchData(attempt + 1);
            } else {
                console.error('Max retries reached. Operation failed.');
                throw error;
            }
        }
    };
    return fetchData(1);
};