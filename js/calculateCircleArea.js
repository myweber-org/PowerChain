function calculateCircleArea(radius) {
    if (typeof radius !== 'number' || radius <= 0) {
        throw new Error('Radius must be a positive number');
    }
    const area = Math.PI * Math.pow(radius, 2);
    return parseFloat(area.toFixed(2));
}function calculateCircleArea(radius) {
    if (typeof radius !== 'number' || radius <= 0) {
        throw new Error('Radius must be a positive number');
    }
    return Math.PI * Math.pow(radius, 2);
}function calculateCircleArea(radius) {
    if (radius <= 0) {
        throw new Error('Radius must be a positive number');
    }
    const area = Math.PI * Math.pow(radius, 2);
    return parseFloat(area.toFixed(2));
}

function validateAndCalculate() {
    try {
        const radiusInput = document.getElementById('radiusInput').value;
        const radius = parseFloat(radiusInput);
        
        if (isNaN(radius)) {
            throw new Error('Please enter a valid number');
        }
        
        const area = calculateCircleArea(radius);
        document.getElementById('result').textContent = `Area: ${area}`;
    } catch (error) {
        document.getElementById('result').textContent = `Error: ${error.message}`;
    }
}function calculateCircleArea(radius) {
    if (typeof radius !== 'number' || radius <= 0) {
        throw new Error('Radius must be a positive number');
    }
    return Math.PI * Math.pow(radius, 2);
}

module.exports = calculateCircleArea;function calculateCircleArea(radius) {
    if (typeof radius !== 'number' || radius <= 0) {
        throw new Error('Radius must be a positive number');
    }
    const area = Math.PI * radius * radius;
    return parseFloat(area.toFixed(2));
}function calculateCircleArea(radius) {
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
    if (radius <= 0) {
        throw new Error('Radius must be a positive number');
    }
    return Math.PI * Math.pow(radius, 2);
}