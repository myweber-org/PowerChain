function validateRegistrationForm(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(email)) {
        return { valid: false, message: "Invalid email format" };
    }

    if (!passwordRegex.test(password)) {
        return { valid: false, message: "Password must be at least 8 characters long and contain both letters and numbers" };
    }

    return { valid: true, message: "Registration data is valid" };
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const validationResult = validateRegistrationForm(email, password);
    const resultElement = document.getElementById("result");

    if (validationResult.valid) {
        resultElement.textContent = "Registration successful!";
        resultElement.style.color = "green";
    } else {
        resultElement.textContent = validationResult.message;
        resultElement.style.color = "red";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registrationForm");
    if (form) {
        form.addEventListener("submit", handleRegistrationSubmit);
    }
});