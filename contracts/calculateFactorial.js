function calculateFactorial(n) {
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
        throw new Error('Input must be a non-negative integer');
    }
    
    if (n === 0 || n === 1) {
        return 1;
    }
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

module.exports = calculateFactorial;function calculateFactorial(n, memo = {}) {
    if (n < 0) throw new Error('Factorial is not defined for negative numbers');
    if (n === 0 || n === 1) return 1;
    if (memo[n]) return memo[n];
    
    memo[n] = n * calculateFactorial(n - 1, memo);
    return memo[n];
}

module.exports = calculateFactorial;