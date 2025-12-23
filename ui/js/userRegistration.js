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
    
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    
    const validationResult = validateRegistrationForm(email, password);
    
    const resultElement = document.getElementById("validationResult");
    resultElement.textContent = validationResult.message;
    resultElement.className = validationResult.valid ? "success" : "error";
    
    if (validationResult.valid) {
        console.log("Registration data is valid, proceeding with submission...");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById("registrationForm");
    if (registrationForm) {
        registrationForm.addEventListener("submit", handleRegistrationSubmit);
    }
});