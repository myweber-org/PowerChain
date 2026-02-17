function generateRandomHexColor() {
    const hexChars = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += hexChars[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateRandomRGBColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomColor(format = 'hex') {
    if (format.toLowerCase() === 'rgb') {
        return generateRandomRGBColor();
    }
    return generateRandomHexColor();
}

function generateMultipleColors(count, format = 'hex') {
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(generateRandomColor(format));
    }
    return colors;
}

export { generateRandomColor, generateMultipleColors };