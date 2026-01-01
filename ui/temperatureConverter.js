function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

module.exports = {
    celsiusToFahrenheit,
    fahrenheitToCelsius
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

function formatTemperature(value, fromUnit, toUnit) {
    const converted = convertTemperature(value, fromUnit);
    const fromSymbol = fromUnit.toUpperCase() === 'C' ? '°C' : '°F';
    const toSymbol = toUnit.toUpperCase() === 'C' ? '°C' : '°F';
    
    return `${value}${fromSymbol} = ${converted.toFixed(2)}${toSymbol}`;
}

module.exports = {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    convertTemperature,
    formatTemperature
};