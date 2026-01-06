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
    return celsiusToKelvin(fahrenheitToCelsius(fahrenheit));
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function kelvinToFahrenheit(kelvin) {
    return celsiusToFahrenheit(kelvinToCelsius(kelvin));
}

function convertTemperature(value, fromUnit, toUnit) {
    const units = ['C', 'F', 'K'];
    if (!units.includes(fromUnit) || !units.includes(toUnit)) {
        throw new Error('Invalid temperature unit');
    }
    
    if (fromUnit === toUnit) return value;
    
    const conversionMap = {
        'C_F': celsiusToFahrenheit,
        'C_K': celsiusToKelvin,
        'F_C': fahrenheitToCelsius,
        'F_K': fahrenheitToKelvin,
        'K_C': kelvinToCelsius,
        'K_F': kelvinToFahrenheit
    };
    
    const conversionKey = `${fromUnit}_${toUnit}`;
    const conversionFunction = conversionMap[conversionKey];
    
    if (conversionFunction) {
        return conversionFunction(value);
    }
    
    throw new Error('Conversion not supported');
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