function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}

function convertTemperature(value, unit) {
  if (unit.toLowerCase() === 'c') {
    return {
      celsius: value,
      fahrenheit: celsiusToFahrenheit(value),
      unit: 'C'
    };
  } else if (unit.toLowerCase() === 'f') {
    return {
      celsius: fahrenheitToCelsius(value),
      fahrenheit: value,
      unit: 'F'
    };
  }
  throw new Error('Invalid unit. Use "C" for Celsius or "F" for Fahrenheit.');
}

function formatTemperature(tempObj) {
  return `${tempObj.celsius.toFixed(1)}°C / ${tempObj.fahrenheit.toFixed(1)}°F`;
}

module.exports = {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  convertTemperature,
  formatTemperature
};function celsiusToFahrenheit(celsius) {
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
    return `${value}°${unit} = ${converted.toFixed(1)}°${targetUnit}`;
}

module.exports = {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    convertTemperature,
    formatTemperature
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

module.exports = {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    convertTemperature
};