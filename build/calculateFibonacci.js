function generateFibonacci(limit) {
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

module.exports = { generateFibonacci, isFibonacciNumber };