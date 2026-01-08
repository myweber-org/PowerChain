async function fetchUserData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();
  users.forEach(user => {
    console.log(`User ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
  });
}

fetchUserData();