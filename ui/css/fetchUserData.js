async function fetchUserData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();
  users.forEach(user => {
    console.log(`User ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
  });
}

fetchUserData();function fetchUserData(userId) {
  return fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('User data:', data);
      return data;
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}