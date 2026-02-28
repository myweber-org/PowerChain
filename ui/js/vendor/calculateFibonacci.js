function generateFibonacci(limit) {
    if (limit <= 0) return [];
    if (limit === 1) return [0];
    
    let sequence = [0, 1];
    while (true) {
        let next = sequence[sequence.length - 1] + sequence[sequence.length - 2];
        if (next > limit) break;
        sequence.push(next);
    }
    return sequence;
}