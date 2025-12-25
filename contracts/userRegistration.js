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
    
    return { isValid: true, message: "Registration validation successful" };
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const validationResult = validateRegistrationForm(email, password, confirmPassword);
    
    const messageElement = document.getElementById('registrationMessage');
    messageElement.textContent = validationResult.message;
    messageElement.className = validationResult.isValid ? 'success' : 'error';
    
    if (validationResult.isValid) {
        console.log('Registration data valid, proceeding with submission...');
    }
}