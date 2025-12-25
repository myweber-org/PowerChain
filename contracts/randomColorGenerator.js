function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomColorArray(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(generateRandomColor());
  }
  return colors;
}

export { generateRandomColor, getRandomColorArray };