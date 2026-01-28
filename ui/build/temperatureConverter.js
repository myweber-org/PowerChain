function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function convertTemperature(value, unit) {
    if (unit.toLowerCase() === 'c') {
        return celsiusToFahrenheit(value);
    } else if (unit.toLowerCase() === 'f') {
        return fahrenheitToCelsius(value);
    } else {
        throw new Error('Invalid unit. Use "C" for Celsius or "F" for Fahrenheit.');
    }
}

module.exports = {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    convertTemperature
};function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function convertTemperature(value, unit) {
    if (unit.toLowerCase() === 'c') {
        return celsiusToFahrenheit(value);
    } else if (unit.toLowerCase() === 'f') {
        return fahrenheitToCelsius(value);
    } else {
        throw new Error('Invalid unit. Use "C" for Celsius or "F" for Fahrenheit.');
    }
}

function formatTemperature(value, originalUnit) {
    const convertedUnit = originalUnit.toLowerCase() === 'c' ? 'F' : 'C';
    return `${value.toFixed(2)}°${convertedUnit}`;
}

function validateTemperatureInput(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function performConversion() {
    const inputValue = parseFloat(document.getElementById('tempInput').value);
    const unit = document.getElementById('unitSelect').value;
    
    if (!validateTemperatureInput(inputValue)) {
        alert('Please enter a valid number');
        return;
    }
    
    try {
        const result = convertTemperature(inputValue, unit);
        const displayText = formatTemperature(result, unit);
        document.getElementById('resultDisplay').textContent = displayText;
    } catch (error) {
        alert(error.message);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const convertButton = document.getElementById('convertBtn');
    if (convertButton) {
        convertButton.addEventListener('click', performConversion);
    }
});