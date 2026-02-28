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

module.exports = { calculateFibonacci, displayFibonacci };function calculateFibonacci(limit) {
    const sequence = [0, 1];
    
    if (limit <= 0) {
        return [];
    }
    
    if (limit === 1) {
        return [0];
    }
    
    while (sequence[sequence.length - 1] + sequence[sequence.length - 2] <= limit) {
        const nextNumber = sequence[sequence.length - 1] + sequence[sequence.length - 2];
        sequence.push(nextNumber);
    }
    
    return sequence;
}

function isFibonacciNumber(num) {
    if (num < 0) return false;
    
    const check1 = 5 * num * num + 4;
    const check2 = 5 * num * num - 4;
    
    const isPerfectSquare = (n) => {
        const sqrt = Math.sqrt(n);
        return sqrt === Math.floor(sqrt);
    };
    
    return isPerfectSquare(check1) || isPerfectSquare(check2);
}

module.exports = {
    calculateFibonacci,
    isFibonacciNumber
};function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}

function displayFibonacci() {
    const input = document.getElementById('fibInput');
    const resultDiv = document.getElementById('fibResult');
    
    const n = parseInt(input.value);
    if (isNaN(n) || n < 1) {
        resultDiv.textContent = 'Please enter a positive integer';
        return;
    }
    
    const fibSequence = calculateFibonacci(n);
    resultDiv.textContent = `Fibonacci sequence (${n} terms): ${fibSequence.join(', ')}`;
}