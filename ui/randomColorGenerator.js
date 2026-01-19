function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function applyRandomTheme() {
    const newColor = generateRandomColor();
    document.documentElement.style.setProperty('--primary-color', newColor);
    console.log('Theme updated with color:', newColor);
}

document.addEventListener('DOMContentLoaded', function() {
    const themeButton = document.createElement('button');
    themeButton.textContent = 'Change Theme';
    themeButton.addEventListener('click', applyRandomTheme);
    document.body.prepend(themeButton);
});