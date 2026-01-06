function calculateFactorial(n, memo = {}) {
    if (n < 0) return null;
    if (n === 0 || n === 1) return 1;
    if (memo[n]) return memo[n];
    
    memo[n] = n * calculateFactorial(n - 1, memo);
    return memo[n];
}

function displayFactorialResult(num) {
    const result = calculateFactorial(num);
    if (result === null) {
        console.log(`Invalid input: ${num} is a negative number`);
        return null;
    }
    console.log(`Factorial of ${num} is: ${result}`);
    return result;
}

module.exports = { calculateFactorial, displayFactorialResult };