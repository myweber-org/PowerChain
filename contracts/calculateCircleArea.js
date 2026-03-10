function calculateCircleArea(radius) {
    if (typeof radius !== 'number' || radius <= 0) {
        throw new Error('Radius must be a positive number');
    }
    return Math.PI * radius * radius;
}

function formatArea(area) {
    return area.toFixed(2);
}

module.exports = { calculateCircleArea, formatArea };