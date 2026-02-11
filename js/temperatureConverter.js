function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function convertTemperature(value, unit) {
    if (unit === 'C') {
        return celsiusToFahrenheit(value);
    } else if (unit === 'F') {
        return fahrenheitToCelsius(value);
    } else {
        throw new Error('Invalid unit. Use "C" for Celsius or "F" for Fahrenheit.');
    }
}

function formatTemperature(value, unit) {
    const converted = convertTemperature(value, unit);
    const targetUnit = unit === 'C' ? 'F' : 'C';
    return `${value}°${unit} = ${converted.toFixed(2)}°${targetUnit}`;
}

module.exports = {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    convertTemperature,
    formatTemperature
};