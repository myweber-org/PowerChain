async function fetchUserData(userId) {
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

fetchUserData(1);async function fetchUserData(url) {
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
            console.log('User Data:', data);
            displayUserInfo(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            displayErrorMessage(error.message);
        });
}

function displayUserInfo(user) {
    const container = document.getElementById('user-info');
    if (container) {
        container.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: ${user.website}</p>
            <p>Company: ${user.company.name}</p>
        `;
    }
}

function displayErrorMessage(message) {
    const container = document.getElementById('user-info');
    if (container) {
        container.innerHTML = `<p class="error">Failed to load user data: ${message}</p>`;
    }
}