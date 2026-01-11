function calculateCircleArea(radius) {
    if (typeof radius !== 'number' || radius <= 0) {
        throw new Error('Radius must be a positive number');
    }
    const area = Math.PI * Math.pow(radius, 2);
    return parseFloat(area.toFixed(2));
}

function validateAndCalculate() {
    try {
        const radius = parseFloat(document.getElementById('radiusInput').value);
        const area = calculateCircleArea(radius);
        document.getElementById('result').textContent = `Area: ${area}`;
    } catch (error) {
        document.getElementById('result').textContent = `Error: ${error.message}`;
    }
}