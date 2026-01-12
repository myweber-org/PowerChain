
function calculateAverage(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return 0;
    }
    
    const sum = numbers.reduce((total, num) => total + num, 0);
    return sum / numbers.length;
}

module.exports = calculateAverage;function calculateAverage(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return 0;
    }
    
    const sum = numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);
    
    return sum / numbers.length;
}