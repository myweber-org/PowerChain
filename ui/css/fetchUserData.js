async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
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
            return data;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            throw error;
        });
}

function displayUserInfo(userId) {
    fetchUserData(userId)
        .then(user => {
            const outputDiv = document.getElementById('userOutput');
            if (outputDiv) {
                outputDiv.innerHTML = `
                    <h3>User Information</h3>
                    <p><strong>ID:</strong> ${user.id}</p>
                    <p><strong>Name:</strong> ${user.name}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Company:</strong> ${user.company.name}</p>
                `;
            }
        })
        .catch(() => {
            const outputDiv = document.getElementById('userOutput');
            if (outputDiv) {
                outputDiv.innerHTML = '<p class="error">Failed to load user data</p>';
            }
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const loadButton = document.getElementById('loadUserBtn');
    if (loadButton) {
        loadButton.addEventListener('click', function() {
            const userIdInput = document.getElementById('userId');
            const userId = parseInt(userIdInput.value) || 1;
            displayUserInfo(userId);
        });
    }
});