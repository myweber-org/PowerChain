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
}