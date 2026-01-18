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

function celsiusToKelvin(celsius) {
    return celsius + 273.15;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function fahrenheitToKelvin(fahrenheit) {
    return (fahrenheit - 32) * 5/9 + 273.15;
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function kelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 9/5 + 32;
}

function convertTemperature(value, fromUnit, toUnit) {
    const units = ['C', 'F', 'K'];
    if (!units.includes(fromUnit) || !units.includes(toUnit)) {
        throw new Error('Invalid temperature unit');
    }

    if (fromUnit === toUnit) {
        return value;
    }

    if (fromUnit === 'C' && toUnit === 'F') {
        return celsiusToFahrenheit(value);
    }
    if (fromUnit === 'C' && toUnit === 'K') {
        return celsiusToKelvin(value);
    }
    if (fromUnit === 'F' && toUnit === 'C') {
        return fahrenheitToCelsius(value);
    }
    if (fromUnit === 'F' && toUnit === 'K') {
        return fahrenheitToKelvin(value);
    }
    if (fromUnit === 'K' && toUnit === 'C') {
        return kelvinToCelsius(value);
    }
    if (fromUnit === 'K' && toUnit === 'F') {
        return kelvinToFahrenheit(value);
    }
}

module.exports = {
    celsiusToFahrenheit,
    celsiusToKelvin,
    fahrenheitToCelsius,
    fahrenheitToKelvin,
    kelvinToCelsius,
    kelvinToFahrenheit,
    convertTemperature
};