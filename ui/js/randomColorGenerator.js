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
});function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateRandomRGBColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomHSLColor() {
    const h = Math.floor(Math.random() * 361);
    const s = Math.floor(Math.random() * 101);
    const l = Math.floor(Math.random() * 101);
    return `hsl(${h}, ${s}%, ${l}%)`;
}

export { generateRandomColor, generateRandomRGBColor, generateRandomHSLColor };function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateRandomColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(getRandomColor());
  }
  return colors;
}

export { getRandomColor, generateRandomColors };