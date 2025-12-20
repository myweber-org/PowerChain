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
}