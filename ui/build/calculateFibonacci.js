function calculateFibonacci(limit) {
    if (limit <= 0) return [];
    if (limit === 1) return [0];
    
    let sequence = [0, 1];
    while (true) {
        let nextValue = sequence[sequence.length - 1] + sequence[sequence.length - 2];
        if (nextValue > limit) break;
        sequence.push(nextValue);
    }
    return sequence;
}function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}