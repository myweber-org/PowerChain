function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateRandomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomRGBA(alpha = Math.random().toFixed(2)) {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export { generateRandomColor, generateRandomRGB, generateRandomRGBA };function generateRandomColor() {
    const hex = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    return {
        hex: `#${hex}`,
        rgb: `rgb(${r}, ${g}, ${b})`
    };
}

function displayRandomColor() {
    const color = generateRandomColor();
    console.log(`Hex: ${color.hex}`);
    console.log(`RGB: ${color.rgb}`);
    return color;
}

module.exports = { generateRandomColor, displayRandomColor };