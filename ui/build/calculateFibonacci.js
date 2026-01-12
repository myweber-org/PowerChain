function calculateFibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 2) return 1;
    memo[n] = calculateFibonacci(n - 1, memo) + calculateFibonacci(n - 2, memo);
    return memo[n];
}