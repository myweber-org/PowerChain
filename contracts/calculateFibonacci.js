function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        const nextValue = sequence[i - 1] + sequence[i - 2];
        sequence.push(nextValue);
    }
    return sequence;
}

function displayFibonacci() {
    const input = document.getElementById('fibInput');
    const resultDiv = document.getElementById('fibResult');
    const n = parseInt(input.value);

    if (isNaN(n) || n < 1) {
        resultDiv.textContent = 'Please enter a positive integer.';
        return;
    }

    const fibSequence = calculateFibonacci(n);
    resultDiv.textContent = `Fibonacci sequence (${n} terms): ${fibSequence.join(', ')}`;
}