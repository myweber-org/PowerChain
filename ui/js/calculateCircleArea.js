function calculateCircleArea(radius) {
    if (typeof radius !== 'number' || radius <= 0) {
        throw new Error('Radius must be a positive number');
    }
    return Math.PI * radius * radius;
}

function calculateCircleCircumference(radius) {
    if (typeof radius !== 'number' || radius <= 0) {
        throw new Error('Radius must be a positive number');
    }
    return 2 * Math.PI * radius;
}

module.exports = {
    calculateCircleArea,
    calculateCircleCircumference
};