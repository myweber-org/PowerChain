function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function applyRandomTheme() {
  const primaryColor = generateRandomColor();
  const secondaryColor = generateRandomColor();
  
  document.documentElement.style.setProperty('--primary-color', primaryColor);
  document.documentElement.style.setProperty('--secondary-color', secondaryColor);
  
  console.log(`Theme updated - Primary: ${primaryColor}, Secondary: ${secondaryColor}`);
}

document.addEventListener('DOMContentLoaded', function() {
  const themeButton = document.createElement('button');
  themeButton.textContent = 'Change Theme';
  themeButton.style.position = 'fixed';
  themeButton.style.top = '20px';
  themeButton.style.right = '20px';
  themeButton.style.padding = '10px 15px';
  themeButton.style.cursor = 'pointer';
  
  themeButton.addEventListener('click', applyRandomTheme);
  document.body.appendChild(themeButton);
  
  applyRandomTheme();
});