function celsiusToFahrenheit(celsius) {
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
    } else {
        throw new Error(`Conversion from ${fromUnit} to ${toUnit} not supported`);
    }
}

function formatTemperature(value, unit) {
    const symbols = {
        'C': '°C',
        'F': '°F',
        'K': 'K'
    };
    return `${value.toFixed(2)} ${symbols[unit]}`;
}

export {
    celsiusToFahrenheit,
    celsiusToKelvin,
    fahrenheitToCelsius,
    fahrenheitToKelvin,
    kelvinToCelsius,
    kelvinToFahrenheit,
    convertTemperature,
    formatTemperature
};