function calculateFactorial(n) {
    if (n < 0) {
        throw new Error('Factorial is not defined for negative numbers');
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * calculateFactorial(n - 1);
}function calculateFactorial(n) {
    if (typeof n !== 'number' || !Number.isInteger(n)) {
        throw new TypeError('Input must be an integer');
    }
    
    if (n < 0) {
        throw new RangeError('Input must be non-negative');
    }
    
    if (n === 0 || n === 1) {
        return 1;
    }
    
    return n * calculateFactorial(n - 1);
}

function validateAndCalculate() {
    try {
        const input = document.getElementById('numberInput').value;
        const number = parseInt(input);
        
        if (isNaN(number)) {
            throw new TypeError('Please enter a valid number');
        }
        
        const result = calculateFactorial(number);
        document.getElementById('result').textContent = 
            `Factorial of ${number} is ${result}`;
    } catch (error) {
        document.getElementById('result').textContent = 
            `Error: ${error.message}`;
    }
}