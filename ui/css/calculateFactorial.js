function calculateFactorial(n) {
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
        throw new Error('Input must be a non-negative integer');
    }
    
    if (n === 0 || n === 1) {
        return 1;
    }
    
    return n * calculateFactorial(n - 1);
}

function displayFactorialResult(number) {
    try {
        const result = calculateFactorial(number);
        console.log(`Factorial of ${number} is: ${result}`);
        return result;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

module.exports = {
    calculateFactorial,
    displayFactorialResult
};function calculateFactorial(n) {
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
        throw new Error('Input must be a non-negative integer');
    }
    
    if (n === 0 || n === 1) {
        return 1;
    }
    
    return n * calculateFactorial(n - 1);
}

function testFactorial() {
    const testCases = [
        { input: 0, expected: 1 },
        { input: 1, expected: 1 },
        { input: 5, expected: 120 },
        { input: 7, expected: 5040 }
    ];
    
    testCases.forEach(testCase => {
        try {
            const result = calculateFactorial(testCase.input);
            console.log(`Factorial of ${testCase.input} is ${result}`);
            
            if (result !== testCase.expected) {
                console.error(`Test failed: expected ${testCase.expected}, got ${result}`);
            }
        } catch (error) {
            console.error(`Error for input ${testCase.input}: ${error.message}`);
        }
    });
}

module.exports = calculateFactorial;