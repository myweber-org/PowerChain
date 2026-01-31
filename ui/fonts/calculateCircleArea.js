function calculateCircleArea(radius) {
    if (typeof radius !== 'number' || radius <= 0) {
        throw new Error('Radius must be a positive number');
    }
    return Math.PI * radius * radius;
}function calculateCircleArea(radius) {
    if (typeof radius !== 'number' || radius < 0) {
        throw new Error('Radius must be a non-negative number');
    }
    return Math.PI * radius * radius;
}