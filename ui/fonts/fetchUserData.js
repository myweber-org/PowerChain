const fetchUserData = async (userId, retries = 3) => {
    const baseUrl = 'https://api.example.com/users';
    
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(`${baseUrl}/${userId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return { success: true, data };
            
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt === retries) {
                return {
                    success: false,
                    error: `Failed after ${retries} attempts: ${error.message}`
                };
            }
            
            await new Promise(resolve => 
                setTimeout(resolve, Math.pow(2, attempt) * 1000)
            );
        }
    }
};

const processUserData = async () => {
    const userId = '12345';
    const result = await fetchUserData(userId);
    
    if (result.success) {
        console.log('User data retrieved:', result.data);
        return result.data;
    } else {
        console.error('Failed to fetch user data:', result.error);
        throw new Error(result.error);
    }
};

export { fetchUserData, processUserData };