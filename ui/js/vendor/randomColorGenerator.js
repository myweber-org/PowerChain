function getRandomHexColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

function getRandomRGBColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomColors(count, format = 'hex') {
    const colors = [];
    const generator = format === 'rgb' ? getRandomRGBColor : getRandomHexColor;
    
    for (let i = 0; i < count; i++) {
        colors.push(generator());
    }
    
    return colors;
}

export { getRandomHexColor, getRandomRGBColor, generateRandomColors };