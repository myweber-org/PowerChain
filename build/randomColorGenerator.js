
function generateRandomColor() {
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
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 101);
  const l = Math.floor(Math.random() * 101);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export { generateRandomColor, generateRandomRGBColor, generateRandomHSLColor };function generateRandomColor() {
    const hex = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
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