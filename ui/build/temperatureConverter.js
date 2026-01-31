function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function convertTemperature(value, unit) {
    if (unit === 'C' || unit === 'c') {
        return celsiusToFahrenheit(value);
    } else if (unit === 'F' || unit === 'f') {
        return fahrenheitToCelsius(value);
    } else {
        throw new Error('Invalid unit. Use "C" for Celsius or "F" for Fahrenheit.');
    }
}

function formatResult(value, fromUnit, result, toUnit) {
    return `${value}°${fromUnit.toUpperCase()} = ${result.toFixed(2)}°${toUnit.toUpperCase()}`;
}

module.exports = {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    convertTemperature,
    formatResult
};