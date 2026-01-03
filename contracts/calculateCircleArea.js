function calculateCircleArea(radius) {
    if (radius < 0) {
        throw new Error('Radius cannot be negative');
    }
    return Math.PI * radius * radius;
}

function formatArea(area) {
    return area.toFixed(2);
}

module.exports = { calculateCircleArea, formatArea };function calculateCircleArea(radius) {
    if (radius <= 0) {
        throw new Error('Radius must be a positive number');
    }
    return Math.PI * Math.pow(radius, 2);
}

function formatArea(area, precision = 2) {
    return area.toFixed(precision);
}

module.exports = { calculateCircleArea, formatArea };