function getRandomHexColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomRGBColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomColors(count, format = 'hex') {
  const colors = [];
  const generator = format === 'rgb' ? getRandomRGBColor : getRandomHexColor;
  
  for (let i = 0; i < count; i++) {
    colors.push(generator());
  }
  
  return colors;
}

export { getRandomHexColor, getRandomRGBColor, generateRandomColors };