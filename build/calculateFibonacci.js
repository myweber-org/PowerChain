function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence.slice(0, n);
}

function printFibonacci(n) {
    const result = calculateFibonacci(n);
    console.log(`Fibonacci sequence (${n} terms):`, result);
    return result;
}

export { calculateFibonacci, printFibonacci };