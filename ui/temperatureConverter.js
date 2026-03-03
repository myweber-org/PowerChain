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
    if (typeof celsius !== 'number' || isNaN(celsius)) {
        throw new Error('Input must be a valid number');
    }
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    if (typeof fahrenheit !== 'number' || isNaN(fahrenheit)) {
        throw new Error('Input must be a valid number');
    }
    return (fahrenheit - 32) * 5/9;
}

function convertTemperature(value, unit) {
    if (typeof value !== 'number' || isNaN(value)) {
        throw new Error('Value must be a valid number');
    }
    
    if (unit.toLowerCase() === 'c') {
        return {
            celsius: value,
            fahrenheit: celsiusToFahrenheit(value)
        };
    } else if (unit.toLowerCase() === 'f') {
        return {
            celsius: fahrenheitToCelsius(value),
            fahrenheit: value
        };
    } else {
        throw new Error('Unit must be "C" or "F"');
    }
}

module.exports = {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    convertTemperature
};