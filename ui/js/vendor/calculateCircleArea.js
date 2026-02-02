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
}function calculateCircleArea(radius) {
    if (radius <= 0) {
        throw new Error('Radius must be a positive number');
    }
    const area = Math.PI * Math.pow(radius, 2);
    return parseFloat(area.toFixed(2));
}

function validateAndCalculate() {
    const radiusInput = document.getElementById('radiusInput');
    const resultDiv = document.getElementById('result');
    
    try {
        const radius = parseFloat(radiusInput.value);
        const area = calculateCircleArea(radius);
        resultDiv.textContent = `Area: ${area}`;
        resultDiv.style.color = 'green';
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
        resultDiv.style.color = 'red';
    }
}