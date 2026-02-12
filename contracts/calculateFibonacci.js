function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    let sequence = [0, 1];
    while (sequence[sequence.length - 1] + sequence[sequence.length - 2] <= n) {
        sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
    }
    return sequence;
}function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    let fib = [0, 1];
    for (let i = 2; i < n; i++) {
        fib.push(fib[i-1] + fib[i-2]);
    }
    return fib;
}

function displayFibonacci(limit) {
    const result = calculateFibonacci(limit);
    console.log(`Fibonacci sequence (${limit} terms):`, result);
    return result;
}

module.exports = { calculateFibonacci, displayFibonacci };