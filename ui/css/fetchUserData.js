function fetchUserData(userId) {
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
      displayUserData(data);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      displayError(error.message);
    });
}

function displayUserData(user) {
  const outputDiv = document.getElementById('userOutput');
  if (outputDiv) {
    outputDiv.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Company:</strong> ${user.company.name}</p>
      <p><strong>Website:</strong> <a href="https://${user.website}" target="_blank">${user.website}</a></p>
    `;
  }
}

function displayError(message) {
  const outputDiv = document.getElementById('userOutput');
  if (outputDiv) {
    outputDiv.innerHTML = `<p class="error">Error: ${message}</p>`;
  }
}async function fetchUserData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched user data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

function displayUserData(users) {
    if (!users || !Array.isArray(users)) {
        console.log('No valid user data to display.');
        return;
    }
    users.forEach(user => {
        console.log(`User: ${user.name}, Email: ${user.email}`);
    });
}

const apiUrl = 'https://jsonplaceholder.typicode.com/users';
fetchUserData(apiUrl).then(displayUserData);