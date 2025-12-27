function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = validateEmail;function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = validateEmail;function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = validateEmail;function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function testValidation() {
    const testEmails = [
        "user@example.com",
        "invalid-email",
        "another.user@domain.co.uk",
        "missing@dotcom",
        "test@sub.domain.org"
    ];

    testEmails.forEach(email => {
        console.log(`${email}: ${validateEmail(email) ? 'Valid' : 'Invalid'}`);
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateEmail, testValidation };
}