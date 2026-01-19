function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 2) return 1;
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

module.exports = fibonacci;function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}

function displayFibonacci(limit) {
    const result = calculateFibonacci(limit);
    console.log(`Fibonacci sequence up to ${limit} numbers:`, result);
    return result;
}

module.exports = { calculateFibonacci, displayFibonacci };function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    let sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}function calculateFibonacci(limit) {
    if (limit <= 0) return [];
    if (limit === 1) return [0];
    
    const sequence = [0, 1];
    while (true) {
        const next = sequence[sequence.length - 1] + sequence[sequence.length - 2];
        if (next > limit) break;
        sequence.push(next);
    }
    return sequence;
}