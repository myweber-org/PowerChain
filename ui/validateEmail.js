function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

module.exports = validateEmail;function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

module.exports = validateEmail;function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = validateEmail;function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function testValidation() {
    const testCases = [
        { email: "test@example.com", expected: true },
        { email: "invalid.email", expected: false },
        { email: "another.test@domain.co.uk", expected: true },
        { email: "spaces in@email.com", expected: false },
        { email: "", expected: false }
    ];

    testCases.forEach((testCase, index) => {
        const result = validateEmail(testCase.email);
        const status = result === testCase.expected ? "PASS" : "FAIL";
        console.log(`Test ${index + 1}: ${status} - ${testCase.email}`);
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateEmail, testValidation };
}