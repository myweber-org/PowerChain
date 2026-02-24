function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function testEmailValidation() {
    const testCases = [
        { email: "test@example.com", expected: true },
        { email: "invalid.email", expected: false },
        { email: "another.test@domain.co.uk", expected: true },
        { email: "spaces in@email.com", expected: false },
        { email: "", expected: false }
    ];

    testCases.forEach(testCase => {
        const result = validateEmail(testCase.email);
        console.log(`Email: "${testCase.email}" => Valid: ${result} (Expected: ${testCase.expected})`);
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateEmail, testEmailValidation };
}