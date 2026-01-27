function calculateCircleArea(radius) {
    if (radius <= 0) {
        throw new Error('Radius must be a positive number');
    }
    return Math.PI * radius * radius;
}

function validateAndCalculate() {
    const input = document.getElementById('radiusInput').value;
    const resultElement = document.getElementById('result');
    
    try {
        const radius = parseFloat(input);
        const area = calculateCircleArea(radius);
        resultElement.textContent = `Area: ${area.toFixed(2)}`;
        resultElement.style.color = '#2ecc71';
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
        resultElement.style.color = '#e74c3c';
    }
}
function calculateCircleArea(radius) {
    if (typeof radius !== 'number' || radius < 0) {
        throw new Error('Radius must be a non-negative number');
    }
    return Math.PI * radius * radius;
}

function formatArea(area, precision = 2) {
    return area.toFixed(precision);
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
    const area = Math.PI * Math.pow(radius, 2);
    return parseFloat(area.toFixed(2));
}function calculateCircleArea(radius) {
    if (typeof radius !== 'number' || radius < 0) {
        throw new Error('Radius must be a non-negative number');
    }
    const area = Math.PI * Math.pow(radius, 2);
    return parseFloat(area.toFixed(2));
}function calculateCircleArea(radius) {
    if (typeof radius !== 'number' || radius < 0) {
        throw new Error('Radius must be a non-negative number');
    }
    const area = Math.PI * Math.pow(radius, 2);
    return parseFloat(area.toFixed(2));
}

module.exports = calculateCircleArea;function calculateCircleArea(radius) {
    if (typeof radius !== 'number' || radius < 0) {
        throw new Error('Radius must be a non-negative number');
    }
    return Math.PI * radius * radius;
}

module.exports = calculateCircleArea;