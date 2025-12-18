function calculateFactorial(n) {
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

function factorialWithLoop(n) {
    if (typeof n !== 'number' || !Number.isInteger(n)) {
        throw new TypeError('Input must be an integer');
    }
    
    if (n < 0) {
        throw new RangeError('Input must be non-negative');
    }
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

module.exports = { calculateFactorial, factorialWithLoop };