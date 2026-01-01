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
});