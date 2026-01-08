function generateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    let sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}

function displayFibonacci() {
    const input = document.getElementById('fibInput');
    const output = document.getElementById('fibOutput');
    const n = parseInt(input.value);
    
    if (isNaN(n) || n < 1) {
        output.textContent = 'Please enter a positive integer.';
        return;
    }
    
    const fibSequence = generateFibonacci(n);
    output.textContent = `Fibonacci sequence (${n} terms): ${fibSequence.join(', ')}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('calculateBtn');
    if (button) {
        button.addEventListener('click', displayFibonacci);
    }
});function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    let sequence = [0, 1];
    while (sequence[sequence.length - 1] + sequence[sequence.length - 2] <= n) {
        sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
    }
    return sequence;
}

function isFibonacciNumber(num) {
    if (num < 0) return false;
    let a = 0, b = 1;
    while (b < num) {
        let temp = b;
        b = a + b;
        a = temp;
    }
    return b === num || num === 0;
}

module.exports = { calculateFibonacci, isFibonacciNumber };function calculateFibonacci(limit) {
    if (limit <= 0) return [];
    if (limit === 1) return [0];

    const sequence = [0, 1];
    while (true) {
        const nextValue = sequence[sequence.length - 1] + sequence[sequence.length - 2];
        if (nextValue > limit) break;
        sequence.push(nextValue);
    }
    return sequence;
}

console.log(calculateFibonacci(100));