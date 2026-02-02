function calculateFactorial(n) {
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
        throw new Error('Input must be a non-negative integer');
    }
    
    if (n === 0 || n === 1) {
        return 1;
    }
    
    return n * calculateFactorial(n - 1);
}

function displayFactorialResult(number) {
    try {
        const result = calculateFactorial(number);
        console.log(`Factorial of ${number} is: ${result}`);
        return result;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

module.exports = {
    calculateFactorial,
    displayFactorialResult
};