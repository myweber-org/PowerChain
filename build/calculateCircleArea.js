function calculateCircleArea(radius) {
  if (typeof radius !== 'number' || radius <= 0) {
    throw new Error('Radius must be a positive number');
  }
  return Math.PI * radius * radius;
}

function formatArea(area) {
  return area.toFixed(2);
}

module.exports = { calculateCircleArea, formatArea };function calculateCircleArea(radius) {
    if (typeof radius !== 'number' || radius <= 0) {
        throw new Error('Radius must be a positive number');
    }
    const area = Math.PI * Math.pow(radius, 2);
    return parseFloat(area.toFixed(2));
}

module.exports = calculateCircleArea;function calculateCircleArea(radius) {
    if (typeof radius !== 'number' || radius <= 0) {
        throw new Error('Radius must be a positive number');
    }
    const area = Math.PI * radius * radius;
    return parseFloat(area.toFixed(2));
}