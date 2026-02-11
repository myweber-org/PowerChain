function validateRegistrationForm(email, password, confirmPassword) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    
    if (!emailRegex.test(email)) {
        return { isValid: false, message: "Invalid email format" };
    }
    
    if (!passwordRegex.test(password)) {
        return { 
            isValid: false, 
            message: "Password must be at least 8 characters with letters and numbers" 
        };
    }
    
    if (password !== confirmPassword) {
        return { isValid: false, message: "Passwords do not match" };
    }
    
    return { isValid: true, message: "Registration data is valid" };
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const validationResult = validateRegistrationForm(email, password, confirmPassword);
    
    const resultElement = document.getElementById('registrationResult');
    if (validationResult.isValid) {
        resultElement.textContent = "Registration successful!";
        resultElement.className = "success";
        // Here you would typically send data to server
        console.log("Registration data:", { email, password });
    } else {
        resultElement.textContent = validationResult.message;
        resultElement.className = "error";
    }
}

// Example usage when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
    }
});function validateRegistrationForm(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    if (!emailRegex.test(email)) {
        return { isValid: false, message: "Invalid email format" };
    }
    
    if (!passwordRegex.test(password)) {
        return { 
            isValid: false, 
            message: "Password must be at least 8 characters with letters and numbers" 
        };
    }
    
    return { isValid: true, message: "Registration data is valid" };
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const validationResult = validateRegistrationForm(email, password);
    
    const resultElement = document.getElementById('result');
    if (validationResult.isValid) {
        resultElement.textContent = "Registration successful!";
        resultElement.className = "success";
        console.log("Registration data:", { email, password: "***" });
    } else {
        resultElement.textContent = validationResult.message;
        resultElement.className = "error";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('submit', handleRegistrationSubmit);
    }
});